import io from 'socket.io-client';
import {messageTypes, uri, path} from '../config/config.js';

const socket = io( uri , {path: path});

export const init = ( store ) => {
    Object.keys( messageTypes )
        .forEach( type => socket.on( type, ( payload ) => (
                store.dispatch({ type, payload: JSON.parse(payload) })
            ))
        );
};

export const emit = ( type, payload ) => socket.emit( type, payload );