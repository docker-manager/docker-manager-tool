import { connect } from 'react-redux'
import DockerContainerDetails from '../components/DockerContainerDetails'

const getSelectedContainer = (containers, selectedContainerId) => {
    return Object.assign({}, containers[selectedContainerId])
}

const mapStateToProps = (state) => ({
    container: getSelectedContainer(state.docker.containers, state.view.selectedContainerId)
})

const SelectedDockerContainerDetails = connect(
    mapStateToProps
)(DockerContainerDetails)

export default SelectedDockerContainerDetails
