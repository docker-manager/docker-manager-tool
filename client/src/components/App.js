import React from 'react'
import WebsocketDockerGraph from '../containers/WebsocketDockerGraph'
import WebsocketDockerFilters from '../containers/WebsocketDockerFilters'
import SelectedDockerContainerView from '../containers/SelectedDockerContainerView'

const App = () => (
    <div className="row">
        <div className="col-md-9">
            <WebsocketDockerGraph />
        </div>
        <div className="col-md-3">
            <WebsocketDockerFilters />
            <SelectedDockerContainerView />
        </div>
    </div>
)

export default App
