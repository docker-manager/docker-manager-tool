package docker

import (
	"log"
	"context"
	"encoding/json"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/api/types/filters"
	"github.com/ekkinox/docker-manager-tool/global"
	"github.com/ekkinox/docker-manager-tool/structure"
)

func BuildDockerClient() *client.Client{
	dockerClient, err := client.NewEnvClient()
	if err != nil {
		log.Fatal(err)
	}

	return dockerClient
}

func FetchDockerGraphData(dockerClient *client.Client) string {

	filter := filters.NewArgs()

	if global.GlobalDockerGraphFilters.NetworksFilter != "*" {
		filter.Add("network", global.GlobalDockerGraphFilters.NetworksFilter)
	}

	if global.GlobalDockerGraphFilters.ContainersFilter != "*" {
		filter.Add("name", global.GlobalDockerGraphFilters.ContainersFilter)
	}

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{
		All: global.GlobalDockerGraphFilters.ContainersFilterAll,
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

	dockerWebsocketData := &structure.DockerGraphData{
		Containers: containersMap,
		Networks: networksMap,
		Filters: *global.GlobalDockerGraphFilters,
	}

	payload, _ := json.Marshal(dockerWebsocketData)

	return string(payload)
}