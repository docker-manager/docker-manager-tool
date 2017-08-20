import React from 'react'
import WebsocketDockerContainerStart from '../../../containers/buttons/WebsocketDockerContainerStart'
import WebsocketDockerContainerStop from '../../../containers/buttons/WebsocketDockerContainerStop'
import WebsocketDockerContainerRestart from '../../../containers/buttons/WebsocketDockerContainerRestart'

const renderContainerState = (containerState) => (
    <span className={"text-uppercase label label-" + (containerState === 'running' ? 'success' : 'danger')}>
        {containerState}
    </span>
)

const Actions = ({container}) => (
<div className="well well-sm">
    <div className="pull-left">
        <p>{renderContainerState(container.State)}&nbsp;<small>({container.Status})</small></p>
    </div>
    <div className="pull-right">
        <div className="btn-group" role="group" aria-label="Actions">
            <WebsocketDockerContainerStart />
            <WebsocketDockerContainerRestart />
            <WebsocketDockerContainerStop />
        </div>
    </div>
    <div style={{clear: 'both'}}/>
</div>


)

export default Actions
