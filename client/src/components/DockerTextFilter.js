import React from 'react'

const DockerTextFilter = ({name, onFilter}) => (
    <div className="form-group">
        <div className="input-group">
            <span className="input-group-addon">{name}</span>
            <input type="text" className="form-control" onChange={(event) => onFilter(event.target.value)}/>
        </div>
    </div>
)

export default DockerTextFilter
