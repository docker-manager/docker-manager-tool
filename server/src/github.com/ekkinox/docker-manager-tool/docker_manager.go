package main

import (
	"net/http"

	"github.com/ekkinox/docker-manager-tool/docker"
	"github.com/ekkinox/docker-manager-tool/websocket"
	"github.com/ekkinox/docker-manager-tool/httpserver"
	"github.com/ekkinox/docker-manager-tool/structure"
	"github.com/ekkinox/docker-manager-tool/global"
)

func init() {
	global.GlobalDockerGraphFilters = &structure.DockerGraphFilters{
		NetworksFilter: "*",
		ContainersFilter: "",
		ContainersFilterAll: false,
	}
}

func main() {
	//docker client init
	dockerClient := docker.BuildDockerClient()

	//interaction websocket
	interactionIoServer := websocket.BuildInteractionWebsocketServer(dockerClient)
	interactionWsServer := new(httpserver.WebsocketCORSServer)
	interactionWsServer.SocketIoServer = interactionIoServer

	//graph websocket
	graphIoServer := websocket.BuildGraphWebsocketServer(dockerClient)
	graphWsServer := new(httpserver.WebsocketCORSServer)
	graphWsServer.SocketIoServer = graphIoServer

	//HTTP settings
	println("Docker Manager Tools Service is listening on  http://localhost:5000")
	//http.Handle("/", http.FileServer(http.Dir("./build")))
	http.Handle("/interaction/", interactionWsServer)
	http.Handle("/graph/", graphWsServer)
	http.ListenAndServe(":5000", nil)
}