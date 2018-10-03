import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import debounce from 'debounce'

import userReducer from './services/user.service/reducer'
import citiesReducer from './services/cities.service/reducer'
import weatherReducer from './services/weather.service/reducer'

const storeKeyName = 'reduxStore'

const loadState = () => {
  try {
    const persistedState = localStorage.getItem(storeKeyName)
    return JSON.parse(persistedState) || undefined
  }
  catch(e) {
    return undefined
  }
}
const saveState = (state) => {
  try {
    localStorage.setItem(storeKeyName, JSON.stringify(state))
  }
  catch(e) {
    return undefined
  }
}

const combinedReducers = combineReducers({
  userState : userReducer,
  citiesState : citiesReducer,
  weatherState : weatherReducer,
})

const store = createStore(combinedReducers, loadState(), applyMiddleware(thunk))

store.subscribe(debounce(() => {
  const state = store.getState()
  saveState(state)
}, 1000))

export default store
