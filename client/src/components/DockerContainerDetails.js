import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';

const renderContainerDetails = (container) => (
<Tabs id="containerDetails">
    <Tab eventKey={1} title="Overview">
        <table className="table table-striped table-condensed">
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{container.Names[0]}</td>
                </tr>
                <tr>
                    <th>Project</th>
                    <td>{container.Labels['com.docker.compose.project'] ? container.Labels['com.docker.compose.project'] : '-'}</td>
                </tr>
                <tr>
                    <th>Service</th>
                    <td>{container.Labels['com.docker.compose.service'] ? container.Labels['com.docker.compose.service'] : '-'}</td>
                </tr>
                <tr>
                    <th>Id</th>
                    <td><code><abbr title={container.Id}>{container.Id.substring(0,15)}</abbr></code></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{renderContainerState(container.State)}&nbsp;({container.Status})</td>
                </tr>
            </tbody>
        </table>
    </Tab>
    <Tab eventKey={2} title="Details">
        <dl className="well">
            <dt>Command</dt>
            <dd>{container.Command}</dd>
            <dt>State</dt>
            <dd>{container.State} ({container.Status})</dd>
        </dl>
    </Tab>
    <Tab eventKey={3} title="Logs">
        <dl className="well">
            <dt>Name</dt>
            <dd>{container.Names[0]}</dd>
            <dt>Command</dt>
            <dd>{container.Command}</dd>
            <dt>State</dt>
            <dd>{container.State} ({container.Status})</dd>
        </dl>
    </Tab>
    <Tab eventKey={4} title="Actions">
        <dl className="well">
            <dt>Name</dt>
            <dd>{container.Names[0]}</dd>
            <dt>Command</dt>
            <dd>{container.Command}</dd>
            <dt>Status</dt>
            <dd>{container.State}&nbsp;({container.Status})</dd>
        </dl>
    </Tab>
</Tabs>
)

const renderContainerState = (containerState) => {
    return (
        <span className={"label label-" + (containerState === 'running' ? 'success' : 'danger')}>{containerState}</span>
    )
}


const DockerContainerDetails = ({container}) => (
    <div className="panel panel-primary">
        <div className="panel-heading">
            <span className="glyphicon glyphicon-search" aria-hidden="true"/>&nbsp;Details
        </div>
        <div className="panel-body">
            { container.Id ? renderContainerDetails(container) : 'Select a container on the network graph.'}
        </div>
    </div>
)

export default DockerContainerDetails
