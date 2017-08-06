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

//Custom server which basically only contains a socketio variable
//But we need it to enhance it with functions
type customServer struct {
	SocketIoServer *socketio.Server
}

//Header handling, this is necessary to adjust security and/or header settings in general
//Please keep in mind to adjust that later on in a productive environment!
//Access-Control-Allow-Origin will be set to whoever will call the server
func (s *customServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header.Get("Origin")
	w.Header().Set("Access-Control-Allow-Origin", origin)
	s.SocketIoServer.ServeHTTP(w, r)
}

func main() {
	dockerClient := configureDockerClient()
	ioServer := configureSocketIOServer(dockerClient)

	wsServer := new(customServer)
	wsServer.SocketIoServer = ioServer

	//HTTP settings
	println("Core Service is listening on port 5000...")
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
				p, _ := listContainers(dockerClient)
				if p != nil {
					so.Emit("refreshNetwork", string(p))
				}
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

func listContainers(dockerClient *client.Client) ([]byte, error) {

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	return json.Marshal(containers);
}