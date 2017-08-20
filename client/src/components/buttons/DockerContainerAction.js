import React from 'react'

const DockerContainerAction = ({text, type, icon, containerId, active, action}) => (
    <a
        href="#"
        title={text}
        className={"btn btn-" + type + " btn-xs"}
        onClick={() => action(containerId)}
        disabled={!active}
    >
        &nbsp;<span className={"glyphicon glyphicon-" + icon} aria-hidden="true"/>&nbsp;
    </a>
)

export default DockerContainerAction
