import { connect } from 'react-redux'
import DockerContainerAction from '../../components/buttons/DockerContainerAction'
import { restartContainer } from '../../actions/actions'

const mapStateToProps = (state) => (
    Object.assign({}, {
        text: "Restart",
        type: "warning",
        icon: "refresh",
        containerId: state.view.selectedContainerId,
        active: state.docker.containers[state.view.selectedContainerId].State === 'running',
    })
)

const mapDispatchToProps = {
    action: restartContainer,
}

const WebsocketDockerContainerRestart = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerContainerAction)

export default WebsocketDockerContainerRestart
