import React from 'react'

const DockerContainersFilter = ({name, onFilterAll, onFilter}) => (
    <div className="form-group">
        <div className="input-group">
            <span className="input-group-addon">{name}</span>
            <input type="text" className="form-control" onChange={(event) => onFilter(event.target.value)}/>
            <span className="input-group-addon">
                All&nbsp;
                <input type="checkbox" aria-label="All" onChange={(event) => onFilterAll(event.target.checked)}/>
            </span>
        </div>
    </div>
)

export default DockerContainersFilter
