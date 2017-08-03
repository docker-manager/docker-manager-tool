import React from 'react'
import DockerContainer from './DockerContainer'

const DockerNetwork = ({ containers }) => (
    <ul>
    {containers.length > 0 && containers.map(container =>
        <DockerContainer{...container}/>
    )}
    </ul>
)


export default DockerNetwork
