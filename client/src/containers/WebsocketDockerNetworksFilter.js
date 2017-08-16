import { connect } from 'react-redux'
import { filterDockerNetworks } from '../actions/actions'
import DockerNetworksFilter from '../components/DockerNetworksFilter'

const getFilters = (networks) => {
    return Object.keys(networks)
}

const mapStateToProps = (state) => ({
    name: 'Networks',
    filters: getFilters(state.docker.networks)
})

const mapDispatchToProps = {
    onFilter: filterDockerNetworks
}

const WebsocketDockerNetworksFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerNetworksFilter)

export default WebsocketDockerNetworksFilter
