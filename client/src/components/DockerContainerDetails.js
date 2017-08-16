import React from 'react'

const containerDetails = (container) => (
    <dl>
        <dt>Name</dt>
        <dd>{container.Names[0]}</dd>
        <dt>Command</dt>
        <dd>{container.Command}</dd>
    </dl>
)

const DockerContainerDetails = ({container}) => (
    <div className="panel panel-primary">
        <div className="panel-heading">
            <span className="glyphicon glyphicon-search" aria-hidden="true"/>&nbsp;Details
        </div>
        <div className="panel-body">
            { container.Id ? containerDetails(container) : 'Select a container'}
        </div>
    </div>
)

export default DockerContainerDetails
