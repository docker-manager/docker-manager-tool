import io from 'socket.io-client';
import {messageTypes, uri, interactionPath, backgroundPath} from '../config/config.js';

const interationSocket = io( uri , {path: interactionPath});
const backgroundSocket = io( uri , {path: backgroundPath});

export const init = ( store ) => {
    Object.keys( messageTypes )
        .forEach( type => interationSocket.on( type, ( payload ) => (
                store.dispatch({ type, payload: JSON.parse(payload) })
            ))
        );

    backgroundSocket.on( messageTypes.receiveDockerData, ( payload ) => (
        store.dispatch({ type: messageTypes.receiveDockerData, payload: JSON.parse(payload) })
    ))
};

export const emit = ( type, payload ) => interationSocket.emit( type, payload );