import React from 'react'

const Networks = ({networks}) => (
    <ul className="list-group">
        {Object.keys(networks).map(network =>
            <li key={network} className="list-group-item">
                <table className="table table-striped table-condensed table-responsive text-left">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td><code>{network}</code></td>
                    </tr>
                    <tr>
                        <th>Ip</th>
                        <td>{networks[network].IPAddress ? networks[network].IPAddress : '-'}</td>
                    </tr>
                    <tr>
                        <th>Gateway</th>
                        <td>{networks[network].Gateway ? networks[network].Gateway : '-'}</td>
                    </tr>
                    <tr>
                        <th>MacAddress</th>
                        <td>{networks[network].MacAddress ? networks[network].MacAddress : '-'}</td>
                    </tr>
                    </tbody>
                </table>
            </li>
        )}
    </ul>
)

export default Networks
