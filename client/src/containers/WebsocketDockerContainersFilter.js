import { connect } from 'react-redux'
import { filterDockerContainers, filterDockerContainersAll } from '../actions/actions'
import DockerContainersFilter from '../components/DockerContainersFilter'

const mapStateToProps = (state) => ({
    name: 'Containers'
})

const mapDispatchToProps = {
    onFilterAll: filterDockerContainersAll,
    onFilter: filterDockerContainers,
}

const WebsocketDockerContainersFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerContainersFilter)

export default WebsocketDockerContainersFilter
