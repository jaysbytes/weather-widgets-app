import * as actionTypes from './action-types'

const initialState = {
  citiesList: []
}
const setCitiesList = (state, citiesList) => {
  return {
    ...state,
    citiesList
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CITIES_LIST_SUCCESS: {
      return setCitiesList(state, action.citiesList)
    }
    default: return state
  }
}

export default reducer