package main

import (
	"log"
	"net/http"
	"context"
	"encoding/json"
	"time"

	"github.com/googollee/go-socket.io"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/api/types/filters"
)

const (
	// Poll docker network for changes with this period.
	dockerTickerPeriod = 1 * time.Second

	// Docker websocket room.
	dockerWebsocketRoom = "docker"
)


type CustomServer struct {
	SocketIoServer *socketio.Server
}

type DockerWebsocketData struct {
	Containers map[string]types.Container
	Networks map[string][]string
}

var DockerWebsocketNetworksFilter = "*"
var DockerWebsocketContainersFilter = ""

func main() {
	//docker client init
	dockerClient := configureDockerClient()

	//websocket servers init
	interactionIoServer := configureInteractionSocketIOServer(dockerClient)
	backgroundIoServer := configureBackgroundSocketIOServer(dockerClient)
	interactionWsServer := new(CustomServer)
	interactionWsServer.SocketIoServer = interactionIoServer
	backgroundWsServer := new(CustomServer)
	backgroundWsServer.SocketIoServer = backgroundIoServer

	//HTTP settings
	println("Docker Manager Tools Service is listening on  http://localhost:5000")
	//http.Handle("/", http.FileServer(http.Dir("./build")))
	http.Handle("/interaction/", interactionWsServer)
	http.Handle("/background/", backgroundWsServer)
	http.ListenAndServe(":5000", nil)

}

func (s *CustomServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header.Get("Origin")
	w.Header().Set("Access-Control-Allow-Origin", origin)
	s.SocketIoServer.ServeHTTP(w, r)
}

func configureInteractionSocketIOServer(dockerClient *client.Client) *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		so.On("askDockerData", func() {
			log.Println("askDockerData")
			so.Emit("receiveDockerData", fetchDockerWebsocketData(dockerClient))
		})

		so.On("filterDockerNetworks", func(filter string) {
			log.Println("filterDockerNetworks " + filter)
			DockerWebsocketNetworksFilter = filter
			so.Emit("receiveDockerData", fetchDockerWebsocketData(dockerClient))
		})

		so.On("filterDockerContainers", func(filter string) {
			log.Println("filterDockerContainers " + filter)
			DockerWebsocketContainersFilter = filter
			so.Emit("receiveDockerData", fetchDockerWebsocketData(dockerClient))
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("InteractionSocket error:", err)
	})

	return server
}

func configureBackgroundSocketIOServer(dockerClient *client.Client) *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		err := so.Join(dockerWebsocketRoom)
		if err == nil {
			log.Println("New backgound connection on '" + dockerWebsocketRoom + "' room by " + so.Id())
		}

		dockerTicker := time.NewTicker(dockerTickerPeriod)
		defer func() {
			dockerTicker.Stop()
			so.Disconnect()
		}()
		for {
			select {
			case <-dockerTicker.C:
				so.Emit("receiveDockerData", fetchDockerWebsocketData(dockerClient))
			}
		}
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("BackgroundSocket error:", err)
	})

	return server
}

func configureDockerClient() *client.Client{
	dockerClient, err := client.NewEnvClient()
	if err != nil {
		log.Fatal(err)
	}

	return dockerClient
}

func fetchDockerWebsocketData(dockerClient *client.Client) string {

	filter := filters.NewArgs()

	if DockerWebsocketNetworksFilter != "*" {
		filter.Add("network", DockerWebsocketNetworksFilter)
	}

	if DockerWebsocketContainersFilter != "*" {
		filter.Add("name", DockerWebsocketContainersFilter)
	}

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{
		All: false,
		Filters: filter,
	})
	if err != nil {
		panic(err)
	}

	containersMap := make(map[string]types.Container)
	networksMap := make(map[string][]string)
	for _, container := range containers {
		containersMap[container.ID] = container
		for networkName, _ := range container.NetworkSettings.Networks {
			networksMap[networkName] = append(networksMap[networkName], container.ID)
		}
	}

	dockerWebsocketData := new(DockerWebsocketData)
	dockerWebsocketData.Containers = containersMap
	dockerWebsocketData.Networks = networksMap

	payload, _ := json.Marshal(dockerWebsocketData)
	return string(payload)
}