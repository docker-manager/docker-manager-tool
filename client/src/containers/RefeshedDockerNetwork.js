import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import DockerNetwork from '../components/DockerNetwork'

const mapStateToProps = (state) => ({
    containers: state.get('payload'),
})

const RefreshedDockerNetwork = connect(
    mapStateToProps,
    {}
)(DockerNetwork)

export default RefreshedDockerNetwork
