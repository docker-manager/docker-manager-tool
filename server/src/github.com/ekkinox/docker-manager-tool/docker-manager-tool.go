package main

import (
	"log"
	"net/http"
	"time"
	"context"
	"encoding/json"

	"github.com/googollee/go-socket.io"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

const (
	// Poll docker network for changes with this period.
	dockerTickerPeriod = 1 * time.Second
)


type CustomServer struct {
	SocketIoServer *socketio.Server
}

type DockerNetwork struct {
	Containers map[string]types.Container
	Networks map[string]types.NetworkResource
}


func (s *CustomServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header.Get("Origin")
	w.Header().Set("Access-Control-Allow-Origin", origin)
	s.SocketIoServer.ServeHTTP(w, r)
}

func main() {
	dockerClient := configureDockerClient()
	ioServer := configureSocketIOServer(dockerClient)

	wsServer := new(CustomServer)
	wsServer.SocketIoServer = ioServer

	//HTTP settings
	println("Docker Manager Tools Service is listening on port 5000...")
	http.Handle("/ws/", wsServer)
	http.ListenAndServe(":5000", nil)
}

func configureSocketIOServer(dockerClient *client.Client) *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		log.Println("on connection")

		so.Join("docker")

		so.On("disconnection", func() {
			log.Println("on disconnect")
		})

		dockerTicker := time.NewTicker(dockerTickerPeriod)
		defer func() {
			dockerTicker.Stop()
			so.Disconnect()
		}()
		for {
			select {
			case <-dockerTicker.C:
				dockerNetwork, err := fetchDockerNetwork(dockerClient)
				if err != nil {
					log.Fatal(err)
				}
				payload, _ := json.Marshal(dockerNetwork)
				so.Emit("refreshDocker", string(payload))
			}
		}
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
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

func fetchDockerNetwork(dockerClient *client.Client) (*DockerNetwork, error) {

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}
	containersMap := make(map[string]types.Container)
	for _, container := range containers {
		containersMap[container.ID] = container
	}

	networks, err := dockerClient.NetworkList(context.Background(), types.NetworkListOptions{})
	if err != nil {
		panic(err)
	}
	networksMap := make(map[string]types.NetworkResource)
	for _, network := range networks {
		networksMap[network.ID] = network
	}

	dockerNetwork := new(DockerNetwork)
	dockerNetwork.Containers = containersMap
	dockerNetwork.Networks = networksMap

	return dockerNetwork, err;
}