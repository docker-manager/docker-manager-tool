package websocket

import (
	"log"

	"github.com/googollee/go-socket.io"
	"github.com/docker/docker/client"
	"github.com/ekkinox/docker-manager-tool/docker"
	"github.com/ekkinox/docker-manager-tool/global"
)

func BuildInteractionWebsocketServer(dockerClient *client.Client) *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		so.On("askDockerData", func() {
			log.Println("askDockerData")
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("filterDockerNetworks", func(filter string) {
			log.Println("filterDockerNetworks " + filter)
			global.GlobalDockerGraphFilters.NetworksFilter = filter
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("filterDockerContainers", func(filter string) {
			log.Println("filterDockerContainers " + filter)
			global.GlobalDockerGraphFilters.ContainersFilter = filter
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("filterDockerContainersAll", func(filter bool) {
			log.Println("filterDockerContainersRunningOnly")
			global.GlobalDockerGraphFilters.ContainersFilterAll = filter
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("resetDockerFilter", func() {
			log.Println("resetDockerFilter")
			global.GlobalDockerGraphFilters.NetworksFilter = "*"
			global.GlobalDockerGraphFilters.ContainersFilter = ""
			global.GlobalDockerGraphFilters.ContainersFilterAll = false
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("startContainer", func(containerId string) {
			log.Println("startContainer " + containerId)
			docker.StartContainer(dockerClient, containerId)
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("stopContainer", func(containerId string) {
			log.Println("stopContainer " + containerId)
			docker.StopContainer(dockerClient, containerId)
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})

		so.On("restartContainer", func(containerId string) {
			log.Println("restartContainer " + containerId)
			docker.RestartContainer(dockerClient, containerId)
			so.Emit("receiveDockerData", docker.FetchDockerGraphData(dockerClient))
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("InteractionWebsocketServer error:", err)
	})

	return server
}
