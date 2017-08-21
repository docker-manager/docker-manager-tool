const port = 5000
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
    'askDockerData',
    'receiveDockerData',
    'filterDockerNetworks',
    'filterDockerContainers',
    'filterDockerContainersAll',
    'resetDockerFilter',
    'startContainer',
    'stopContainer',
    'restartContainer',
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
            centralGravity: 0.051,
            springLength: 100,
            springConstant: 0.001,
            nodeDistance: 300,
            damping: 0.09
        },
    },
    nodes: {
        shape: 'box',
        font: {
            color: '#000000',
            size: 14,
            face: 'sans serif'
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: false
            },
        },
        color: "#343434",
        length: 100,
        font: {
            color: '#343434',
            size: 13,
            face: 'sans serif'
        }
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
    backgroundPath: '/graph/'
}
