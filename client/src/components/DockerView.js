import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import Container from '../components/view/container/Container'
import Image from '../components/view/container/Image'
import Networks from '../components/view/container/Networks'
import Mounts from '../components/view/container/Mounts'
import Actions from '../components/view/container/Actions'

const renderContainer = (container) => (
    <div>
        <Actions container={container}/>
        <Tabs id="containerDetails">
            <Tab eventKey={1} title="Container">
                <Container container={container}/>
            </Tab>
            <Tab eventKey={2} title="Image">
                <Image container={container}/>
            </Tab>
            <Tab eventKey={3} title="Network">
                <Networks networks={container.NetworkSettings.Networks}/>
            </Tab>
            <Tab eventKey={4} title="Mount">
                <Mounts mounts={container.Mounts}/>
            </Tab>
            <Tab eventKey={5} title="Actions">
                Logs...
            </Tab>
        </Tabs>
    </div>
)

const DockerView = ({container}) => (
    <div className="panel panel-primary">
        <div className="panel-heading">
            <span className="glyphicon glyphicon-search" aria-hidden="true"/>&nbsp;Details
        </div>
        <div className="panel-body">
            { container.Id ? renderContainer(container) : 'Select a container on the network graph.'}
        </div>
    </div>
)

export default DockerView
