import * as actionTypes from '../actions/actionTypes'

export const selectContainer = containerId => {
    return {
        type: actionTypes.selectContainer,
        containerId
    }
}