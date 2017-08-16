import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';

const containerDetails = (container) => (
<Tabs id="containerDetails">
    <Tab eventKey={1} title="Overview">
        <dl>
            <dt>Name</dt>
            <dd>{container.Names[0]}</dd>
            <dt>Command</dt>
            <dd>{container.Command}</dd>
            <dt>State</dt>
            <dd>{container.State} ({container.Status})</dd>
        </dl>
    </Tab>
    <Tab eventKey={2} title="Details">
        Tab 2 content
    </Tab>
    <Tab eventKey={3} title="Logs">
        Tab 3 content
    </Tab>
    <Tab eventKey={4} title="Actions">
        Tab 4 content
    </Tab>
</Tabs>
)

const DockerContainerDetails = ({container}) => (
    <div className="panel panel-primary">
        <div className="panel-heading">
            <span className="glyphicon glyphicon-search" aria-hidden="true"/>&nbsp;Details
        </div>
        <div className="panel-body">
            { container.Id ? containerDetails(container) : 'Select a container on the network graph.'}
        </div>
    </div>
)

export default DockerContainerDetails
