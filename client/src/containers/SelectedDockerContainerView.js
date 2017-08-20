import { connect } from 'react-redux'
import DockerView from '../components/DockerView'

const getSelectedContainer = (containers, selectedContainerId) => {
    return Object.assign({}, containers[selectedContainerId])
}

const mapStateToProps = (state) => ({
    container: getSelectedContainer(state.docker.containers, state.view.selectedContainerId)
})

const SelectedDockerContainerView = connect(
    mapStateToProps
)(DockerView)

export default SelectedDockerContainerView
