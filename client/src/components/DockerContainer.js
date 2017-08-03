import React from 'react'

const DockerContainer = ({container}) => (
    <div className="well">{JSON.stringify(container)}</div>
)

export default DockerContainer
