import React from 'react'

const DockerNetworksFilter = ({name, filters, onFilter}) => (
    <div className="form-group">
        <div className="input-group">
            <span className="input-group-addon">{name}</span>
            <select className="form-control" onChange={(event) => onFilter(event.target.value)}>
                <option value='*'>All</option>
                {filters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
            </select>
        </div>
    </div>
)

export default DockerNetworksFilter
