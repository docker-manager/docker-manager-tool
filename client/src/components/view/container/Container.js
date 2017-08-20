import React from 'react'
import CopyToClipboard from '../../buttons/CopyToClipboard'

const renderContainerPorts = (containerPorts) => {
    let ports = []

    Object.keys(containerPorts).map(port => {
        let containerPort = containerPorts[port], render = ''
        if (containerPort.IP && containerPort.PublicPort) {
            render += containerPort.IP + ':' + containerPort.PublicPort + '->'
        }
        render += containerPort.PrivatePort + '/' + containerPort.Type
        ports.push(render)
    })

    return ports.length > 0 ? ports.sort().join(', ') : '-'
}

const Container = ({container}) => (
    <ul className="list-group">
        <li className="list-group-item">
            <table className="table table-striped table-condensed table-responsive text-left">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td><code>{container.Names[0]}</code></td>
                    </tr>
                    <tr>
                        <th>Id</th>
                        <td>
                            <abbr title={container.Id}>{container.Id.substring(0,30)}</abbr>&nbsp;
                            <CopyToClipboard data={container.Id}/>
                        </td>
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
                        <th>Ports</th>
                        <td>{renderContainerPorts(container.Ports)}</td>
                    </tr>
                    <tr>
                        <th>Command</th>
                        <td><kbd>{container.Command}</kbd></td>
                    </tr>
                </tbody>
            </table>
        </li>
    </ul>
)

export default Container
