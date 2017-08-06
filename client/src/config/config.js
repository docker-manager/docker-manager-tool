const port = 5000
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
    'refreshNetwork',
].reduce(
    (accum, msg) => {
        accum[ msg ] = msg
        return accum
    },
    {}
)

const graphOptions = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
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
