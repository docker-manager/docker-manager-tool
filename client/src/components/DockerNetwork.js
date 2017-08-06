import React from 'react'
import DockerContainer from './DockerContainer'
import Graph from 'react-graph-vis'

const DockerNetwork = ({ containers = [], graph, options }) => (
    <div>
        <ul>
        {containers.length > 0 && containers.map(
            container => <DockerContainer key={container.Id} {...container}/>
        )}
        </ul>
        <Graph graph={graph} options={options}/>
    </div>
)


export default DockerNetwork
