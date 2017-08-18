import * as actionTypes from '../actions/actionTypes'
import { messageTypes } from '../config/config.js';

export const askDockerData = () => {
    return ( dispatch, getState, {emit}) => {
        emit( messageTypes.askDockerData)
        dispatch({
            type: messageTypes.askDockerData
        })
    };
}

export const filterDockerNetworks = networkName => {
    return ( dispatch, getState, {emit}) => {
        emit( messageTypes.filterDockerNetworks, networkName)
    };
}

export const filterDockerContainers = containerName => {
    return ( dispatch, getState, {emit}) => {
        emit( messageTypes.filterDockerContainers, containerName)
    };
}

export const filterDockerContainersAll = filterAll => {
    return ( dispatch, getState, {emit}) => {
        emit( messageTypes.filterDockerContainersAll, filterAll)
    };
}

export const resetDockerFilter = () => {
    return ( dispatch, getState, {emit}) => {
        dispatch({
            type: actionTypes.resetDockerFilterForm
        })
        emit( messageTypes.resetDockerFilter)
    };
}

export const selectContainer = containerId => {
    return {
        type: actionTypes.selectContainer,
        containerId
    }
}