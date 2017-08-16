import React from 'react'
import DockerFilters from './DockerFilters'
import WebsocketDockerGraph from '../containers/WebsocketDockerGraph'
import SelectedDockerContainerDetails from '../containers/SelectedDockerContainerDetails'

const App = () => (
    <div className="row">
        <div className="col-md-9">
            <WebsocketDockerGraph />
        </div>
        <div className="col-md-3">
            <DockerFilters />
            <SelectedDockerContainerDetails />
        </div>
    </div>
)

export default App
