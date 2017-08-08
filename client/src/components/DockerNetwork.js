import React from 'react'
import Graph from 'react-graph-vis'

const DockerNetwork = ({ containers = [], graph, options, events }) => (
    <div className="col-md-8">
        <Graph graph={graph} options={options} events={events}/>
    </div>
)


export default DockerNetwork
