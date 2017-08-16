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
        dispatch({
            type: messageTypes.filterDockerNetworks,
            networkName
        })
        emit( messageTypes.filterDockerNetworks, networkName)
    };
}

export const filterDockerContainers = containerName => {
    return ( dispatch, getState, {emit}) => {
        dispatch({
            type: messageTypes.filterDockerContainers,
            containerName
        })
        emit( messageTypes.filterDockerContainers, containerName)
    };
}

export const filterDockerContainersAll = filterAll => {
    return ( dispatch, getState, {emit}) => {
        dispatch({
            type: messageTypes.filterDockerContainersAll,
            filterAll
        })
        emit( messageTypes.filterDockerContainersAll, filterAll)
    };
}

export const selectContainer = containerId => {
    return {
        type: actionTypes.selectContainer,
        containerId
    }
}