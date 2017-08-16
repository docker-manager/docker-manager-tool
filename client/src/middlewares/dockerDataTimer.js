import * as actionTypes from '../actions/actionTypes'
import { askDockerData } from '../actions/actions'

const dockerDataTimerMiddleware = ({dispatch, getState}) => {
    const timers = {};

    return next => action => {
        if (action.type === actionTypes.startTimer) {
            clearInterval(timers['dockerDataTimer']);

            timers['dockerDataTimer'] = setInterval(() => {
                dispatch(askDockerData())

            }, 2000);
        }
        else if (action.type === actionTypes.stopTimer) {
            clearInterval(timers['dockerDataTimer']);
        }
        else {
            return next(action);
        }
    }
}


export default dockerDataTimerMiddleware