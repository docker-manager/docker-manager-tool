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
	"github.com/rs/cors"
)

const (
	// Poll docker network for changes with this period.
	dockerTickerPeriod = 1 * time.Second
)

func listContainers() ([]byte, error) {
	dockerClient, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	return json.Marshal(containers);
}

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		log.Println("on connection")

		so.Join("docker")

		//so.On("chat message", func(msg string) {
		//	so.Emit("chat message", msg)
		//	so.BroadcastTo("chat", "chat message", msg)
		//})

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
				p, _ := listContainers()
				if p != nil {
					so.Emit("refreshNetwork", string(p))
				}
			}
		}
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./build")))
	mux.Handle("/ws/", server)

	// provide default cors to the mux
	handler := cors.Default().Handler(mux)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: false,
	})

	// decorate existing handler with cors functionality set in c
	handler = c.Handler(handler)

	log.Println("Serving at localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", handler))
}
