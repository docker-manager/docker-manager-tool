package websocket

import (
	"log"
	"time"

	"github.com/googollee/go-socket.io"
	"github.com/docker/docker/client"
	"github.com/ekkinox/docker-manager-tool/docker"
)

const (
	// Poll docker network for changes with this period.
	dockerTickerPeriod = 1 * time.Second
	// Docker websocket room.
	dockerWebsocketRoom = "graph"
)

func BuildGraphWebsocketServer(dockerClient *client.Client) *socketio.Server {
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
				so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
			}
		}
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("GraphWebsocketServer error:", err)
	})

	return server
}
