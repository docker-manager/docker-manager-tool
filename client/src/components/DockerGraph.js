import React from 'react'
import Graph from 'react-graph-vis'

const DockerGraph = ({graph, events, options}) => (
<div className="panel panel-primary">
    <div className="panel-heading">
        <span className="glyphicon glyphicon-globe" aria-hidden="true"/>&nbsp;Docker Network
    </div>
    <div className="panel-body">
        <Graph
            graph={graph}
            options={options}
            events={events}
            style={{ width: '100%', height: '600px' }}
        />
    </div>
</div>

)

export default DockerGraph
