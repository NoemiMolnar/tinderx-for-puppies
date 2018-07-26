import users from '../users/users-hardcoded'
import {SELECT_USER} from '../actions/user-actions'

const initialState = null

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case SELECT_USER:
      return action.payload

    default:
      console.log('default in current user')
      return state 
  }
}
