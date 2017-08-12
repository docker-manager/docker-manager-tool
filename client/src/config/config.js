const port = 5000
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
    'refreshDocker',
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
            centralGravity: 0.001,
            springLength: 400,
            springConstant: 0.005,
            nodeDistance: 300,
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
    }
};

module.exports = {
    port,
    host,
    messageTypes,
    graphOptions,
    uri: `${host}:${port}`,
    path: '/ws/'
}
