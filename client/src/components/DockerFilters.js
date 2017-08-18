import React, { Component } from 'react'
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class DockerFilters extends Component {

    constructor (props) {
        super(props)
        this.onReset = this.onReset.bind(this);
    }

    onReset () {
        this.refs.networksFilterInput.value = '*'
        this.refs.containersFilterInput.value = ''
        this.refs.containersAllFilterInput.checked = false
        this.props.onReset()
    }

    render() {
        const {
            currentContainerFilter,
            currentContainerFilterAll,
            networkFilters,
            currentNetworkFilter,
            onContainerFilter,
            onContainerFilterAll,
            onNetworkFilter
        } = this.props

        return (
<div className="panel panel-primary">
    <div className="panel-heading">
        <span className="glyphicon glyphicon-filter" aria-hidden="true"/>&nbsp;Filters
    </div>
    <div className="panel-body">
        <form>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>Containers</InputGroup.Addon>
                    <FormControl
                        ref="containersFilterInput"
                        type="text"
                        value={currentContainerFilter}
                        onChange={(event) => {
                            onContainerFilter(event.target.value)
                        }}
                    />
                    <InputGroup.Addon>
                        All&nbsp;
                        <input
                            ref="containersAllFilterInput"
                            type="checkbox"
                            checked={currentContainerFilterAll}
                            onChange={(event) => {
                                onContainerFilterAll(event.target.checked)
                            }}
                        />
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>Related networks</InputGroup.Addon>
                    <FormControl
                        ref="networksFilterInput"
                        componentClass="select"
                        value={currentNetworkFilter}
                        onChange={(event) => onNetworkFilter(event.target.value)}
                    >
                        <option value='*'>All</option>
                        {networkFilters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                    </FormControl>
                </InputGroup>
            </FormGroup>
            <Button bsStyle="danger" className="btn-block btn-sm" onClick={this.onReset}>
                Reset Filters
            </Button>
        </form>
    </div>
</div>
        )
    }
}

export default DockerFilters
