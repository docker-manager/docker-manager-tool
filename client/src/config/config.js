const port = 5000
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
    'askDockerData',
    'receiveDockerData',
    'filterDockerNetworks',
    'filterDockerContainers'
].reduce(
    (accum, msg) => {
        accum[ msg ] = msg
        return accum
    },
    {}
)

const graphOptions = {
    autoResize: true,
    layout: {
        hierarchical: false
    },
    physics: {
        solver: 'repulsion',
        repulsion: {
            centralGravity: 0.091,
            springLength: 100,
            springConstant: 0.005,
            nodeDistance: 200,
            damping: 0.09
        },
    },
    nodes: {
        shape: 'box'
    },
    edges: {
        arrows: {
            to: {
                enabled: false
            },
        },
        color: "#000000",
        length: 100,
    },
    interaction:{
        hover: true,
        hoverConnectedEdges: true
    }
};

module.exports = {
    port,
    host,
    messageTypes,
    graphOptions,
    uri: `${host}:${port}`,
    interactionPath: '/interaction/',
    backgroundPath: '/background/'
}
