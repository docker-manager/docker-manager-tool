import React from 'react'
import Graph from 'react-graph-vis'

const DockerGraph = ({graph, events, options}) => (
    <div className="well">
        <Graph
            graph={graph}
            options={options}
            events={events}
            style={{ width: '100%', height: '600px' }}
        />
    </div>
)

export default DockerGraph
