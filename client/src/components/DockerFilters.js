import React from 'react'
import WebsocketDockerNetworkFilter from '../containers/WebsocketDockerNetworksFilter'
import WebsocketDockerContainersFilter from '../containers/WebsocketDockerContainersFilter'

const DockerFilter = () => (
<div className="panel panel-primary">
    <div className="panel-heading">
        <span className="glyphicon glyphicon-filter" aria-hidden="true"/>&nbsp;Filters
    </div>
    <div className="panel-body">
        <WebsocketDockerNetworkFilter />
        <WebsocketDockerContainersFilter />
    </div>
</div>
)

export default DockerFilter
