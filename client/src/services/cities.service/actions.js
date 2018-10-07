import * as actionTypes from './action-types'
import { getCityList } from '../api.service/cities'

const setCitiesList = (citiesList) => ({
  type : actionTypes.GET_CITIES_LIST_SUCCESS,
  citiesList
})

export const getCitiesList = () => async (dispatch, getState) => {
  try {
    const { data : citiesList } = await getCityList()
    dispatch(setCitiesList(citiesList))
  }
  catch(e) {
    console.error(e)
  }
}