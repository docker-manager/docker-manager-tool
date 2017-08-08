import React from 'react'
import DockerContainer from './DockerContainer'
import DockerNetworkFilters from './DockerNetworkFilters'
import WebsocketDockerNetwork from '../containers/WebsocketDockerNetwork'

const App = () => (
  <div className="row">
    <WebsocketDockerNetwork />
    <DockerNetworkFilters />
    <DockerContainer />
  </div>
)

export default App
