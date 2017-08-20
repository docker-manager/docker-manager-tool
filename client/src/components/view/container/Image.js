import React from 'react'
import CopyToClipboard from '../../buttons/CopyToClipboard'

const Image = ({container}) => (
    <ul className="list-group">
        <li className="list-group-item">
            <table className="table table-striped table-condensed table-responsive text-left">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td><code>{container.Image}</code></td>
                    </tr>
                    <tr>
                        <th>Id</th>
                        <td>
                            <abbr title={container.ImageID}>{container.ImageID.substring(0,30)}</abbr>&nbsp;
                            <CopyToClipboard data={container.ImageID}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    </ul>
)

export default Image
