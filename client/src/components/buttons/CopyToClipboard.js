import React from 'react'
import Clipboard from 'clipboard'

new Clipboard('.btn-clipboard');

const CopyToClipboard = ({data}) => (
    <button title="Copy to clipboard" className="btn btn-default btn-clipboard btn-xs" data-clipboard-text={data}>
        <span className="glyphicon glyphicon-copy" aria-hidden="true"/>
    </button>
)

export default CopyToClipboard
