import React from 'react'

const DockerFilter = ({name, filters}) => (
    <div className="input-group">
        <span className="input-group-addon">{name}</span>
        <select className="form-control">
            <option value='all'>All</option>
            {filters.map(filter => <option key={filter.id} value={filter.id}>{filter.label}</option>)}
        </select>
    </div>
)

export default DockerFilter
