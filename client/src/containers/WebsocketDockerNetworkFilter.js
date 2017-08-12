import { connect } from 'react-redux'
import DockerFilter from '../components/DockerFilter'

const getFilters = (networks) => {
    return Object.keys(networks).map(function(networkId) {
        return {
            id: networkId,
            label: networks[networkId].Name,
        }
    })
}

const mapStateToProps = (state) => ({
    name: 'Networks',
    filters: getFilters(state.docker.networks)
})

const WebsocketDockerNetworkFilter = connect(
    mapStateToProps
)(DockerFilter)

export default WebsocketDockerNetworkFilter
