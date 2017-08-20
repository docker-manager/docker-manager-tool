import { connect } from 'react-redux'
import DockerContainerAction from '../../components/buttons/DockerContainerAction'
import { startContainer } from '../../actions/actions'

const mapStateToProps = (state) => (
    Object.assign({}, {
        text: "Start",
        type: "success",
        icon: "play",
        containerId: state.view.selectedContainerId,
        active: state.docker.containers[state.view.selectedContainerId].State !== 'running',
    })
)

const mapDispatchToProps = {
    action: startContainer,
}

const WebsocketDockerContainerStart = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerContainerAction)

export default WebsocketDockerContainerStart
