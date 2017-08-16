import { connect } from 'react-redux'
import { filterDockerContainers } from '../actions/actions'
import DockerTextFilter from '../components/DockerTextFilter'

const mapStateToProps = (state) => ({
    name: 'Containers'
})

const mapDispatchToProps = {
    onFilter: filterDockerContainers
}

const WebsocketDockerContainersFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(DockerTextFilter)

export default WebsocketDockerContainersFilter
