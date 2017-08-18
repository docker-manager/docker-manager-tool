import { connect } from 'react-redux'
import DockerFilters from '../components/DockerFilters'
import {
    filterDockerNetworks,
    filterDockerContainers,
    filterDockerContainersAll,
    resetDockerFilter
} from '../actions/actions'


const mapStateToProps = (state) => (
    Object.assign({}, state, {
        currentContainerFilter: state.filters.containers.current,
        currentContainerFilterAll: state.filters.containers.all,
        networkFilters: Object.keys(state.docker.networks),
        currentNetworkFilter: state.filters.networks.current,
    })
)

const mapDispatchToProps = {
    onContainerFilter: filterDockerContainers,
    onContainerFilterAll: filterDockerContainersAll,
    onNetworkFilter: filterDockerNetworks,
    onReset: resetDockerFilter,
}

const WebsocketDockerFilters = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerFilters)

export default WebsocketDockerFilters
