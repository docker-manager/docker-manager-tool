import React from 'react'
import WebsocketDockerNetworkFilter from '../containers/WebsocketDockerNetworkFilter'

const DockerFilter = () => (
<div className="panel panel-primary">
    <div className="panel-heading">Filters</div>
    <div className="panel-body">
        <WebsocketDockerNetworkFilter />
    </div>
</div>
)

export default DockerFilter
