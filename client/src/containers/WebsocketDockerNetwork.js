import { graphOptions } from '../config/config.js'
import { connect } from 'react-redux'
import DockerNetwork from '../components/DockerNetwork'

const getGraphNodes = (containers) => {
    return Object.keys(containers).map(function(containerId) {
        return {
            id: containerId,
            label: containers[containerId].Names[0],
        }
    })
}

const getGraphEdges = (networks) => {
    let nodes = []
     Object.keys(networks).map(function(networkId) {
         Object.keys(networks[networkId].Containers).pairs(function(pair){
             nodes.push({
                 from: pair[0],
                 to: pair[1],
                 label: networks[networkId].Name
             })
         })
     })

    return nodes
}

var events = {
    selectNode: function(event) {
        let { nodes, edges } = event;
        console.log(nodes)
    }
}


const mapStateToProps = (state) => ({
    containers: state.dockerNetwork.containers,
    graph: {
        nodes: getGraphNodes(state.dockerNetwork.containers),
        edges: getGraphEdges(state.dockerNetwork.networks),
    },
    options: graphOptions,
    events: events
})

const WebsocketDockerNetwork = connect(
    mapStateToProps
)(DockerNetwork)

export default WebsocketDockerNetwork
