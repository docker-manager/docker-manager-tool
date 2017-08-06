import { graphOptions } from '../config/config.js'
import { connect } from 'react-redux'
import DockerNetwork from '../components/DockerNetwork'

const getGraphNodes = (containers) => {
    return containers.map(function(container) {
        return {
            id: container.Id,
            label: container.Names[0]
        }
    })
}


const mapStateToProps = (state) => ({
    containers: state.dockerNetwork.containers,
    graph: {
        nodes: getGraphNodes(state.dockerNetwork.containers),
        edges: {}
    },
    options: graphOptions
})

const WebsocketDockerNetwork = connect(
    mapStateToProps
)(DockerNetwork)

export default WebsocketDockerNetwork
