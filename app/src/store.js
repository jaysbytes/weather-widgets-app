import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './services/user.service/reducer'

const combinedReducers = combineReducers({
  userState : userReducer,
})

const store = createStore(combinedReducers, applyMiddleware(thunk))


export default store
