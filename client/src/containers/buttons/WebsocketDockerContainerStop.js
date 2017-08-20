import { connect } from 'react-redux'
import DockerContainerAction from '../../components/buttons/DockerContainerAction'
import { stopContainer } from '../../actions/actions'

const mapStateToProps = (state) => (
    Object.assign({}, {
        text: "Stop",
        type: "danger",
        icon: "stop",
        containerId: state.view.selectedContainerId,
        active: state.docker.containers[state.view.selectedContainerId].State === 'running',
    })
)

const mapDispatchToProps = {
    action: stopContainer,
}

const WebsocketDockerContainerStop = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerContainerAction)

export default WebsocketDockerContainerStop
