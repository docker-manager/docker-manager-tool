import React from 'react'

const Mounts = ({mounts}) => (
    <ul className="list-group">
        {Object.keys(mounts).map(mount =>
            <li key={mount} className="list-group-item">
                <table className="table table-striped table-condensed table-responsive text-left">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td><code>{mounts[mount].Name ? mounts[mount].Name : '-'}</code></td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{mounts[mount].Type}</td>
                    </tr>
                    <tr>
                        <th>Driver</th>
                        <td>{mounts[mount].Driver}</td>
                    </tr>
                    <tr>
                        <th>Source</th>
                        <td><abbr title={mounts[mount].Source}>{mounts[mount].Source.substring(0,33)}</abbr></td>
                    </tr>
                    <tr>
                        <th>Destination</th>
                        <td><abbr title={mounts[mount].Destination}>{mounts[mount].Destination.substring(0,33)}</abbr></td>
                    </tr>
                    <tr>
                        <th>Mode</th>
                        <td>{mounts[mount].Mode}</td>
                    </tr>
                    </tbody>
                </table>
            </li>
        )}
    </ul>
)

export default Mounts
