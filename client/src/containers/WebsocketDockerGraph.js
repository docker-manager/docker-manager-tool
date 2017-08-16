import { graphOptions } from '../config/config.js'
import { connect } from 'react-redux'
import { selectContainer } from '../actions/actions'
import DockerGraph from '../components/DockerGraph'

const getGraphNodes = (containers) => {
    return Object.keys(containers).map(function(containerId) {
        return {
            id: containerId,
            label: containers[containerId].Names[0],
            group: containers[containerId].Labels['com.docker.compose.project']
        }
    })
}

const getGraphEdges = (networks) => {
    let nodes = []
     Object.keys(networks).map((networkName) => {
         networks[networkName].pairs(function(pair){
             nodes.push({
                 from: pair[0],
                 to: pair[1],
                 label: networkName
             })
         })
     })

    return nodes
}

const mapStateToProps = (state) => ({
    graph: {
        nodes: getGraphNodes(state.docker.containers),
        edges: getGraphEdges(state.docker.networks),
    },
    options: graphOptions,
})

const mapDispatchToProps = dispatch => {
    return {
        events: {
            selectNode: function(event) {
                let { nodes } = event;
                dispatch(selectContainer(nodes[0]))
            },
            deselectNode: function() {
                dispatch(selectContainer())
            },
        }
    }
}

const WebsocketDockerGraph = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerGraph)

export default WebsocketDockerGraph
