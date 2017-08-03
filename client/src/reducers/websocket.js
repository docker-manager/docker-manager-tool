import * as config from '../config/config.js'

const { messageTypes } = config

const websocketReducer = (state = {}, action) => {

  if (action.type === messageTypes.refreshNetwork) {
      return Object.assign({}, state, {
          payload: JSON.parse(action.payload)
      })
  }

  return state
}

export default websocketReducer
