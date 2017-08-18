package structure

import (
	"github.com/docker/docker/api/types"
)

type DockerGraphData struct {
	Containers map[string]types.Container
	Networks   map[string][]string
	Filters    DockerGraphFilters
}

type DockerGraphFilters struct {
	NetworksFilter string
	ContainersFilter string
	ContainersFilterAll bool
}