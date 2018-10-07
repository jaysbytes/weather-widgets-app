import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import PropTypes from 'prop-types'

import AddWidgetView from './AddWidget.view.jsx'

import { getCitiesList } from '../../../../services/cities.service/actions'
import { addCityWidget } from '../../../../services/weatherWidgets.service/actions'

const mapStateToProps = (state) => ({
  citiesList : state.citiesState.citiesList
})

const mapDispatchToProps = (dispatch) => ({
  getCitiesList : () => {
    dispatch(getCitiesList())
  },
  addCityWidget : (cityID) => {
    return dispatch(addCityWidget(cityID))
  }
})

class AddWidgetContainer extends Component {
  static propTypes = {
    citiesList : PropTypes.arrayOf(PropTypes.shape({
      id : PropTypes.number.isRequired,
      name : PropTypes.string.isRequired
    })).isRequired,
    getCitiesList : PropTypes.func.isRequired,
    addCityWidget : PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      cityID : undefined
    }
    this.setSelectedCityID = this.setSelectedCityID.bind(this)
    this.addCityWidget = this.addCityWidget.bind(this)
  }
  componentDidMount() {
    this.props.getCitiesList()
  }
  setSelectedCityID(selectedCity) {
    this.setState({
      cityID : selectedCity ? selectedCity.value : undefined
    })
  }
  addCityWidget() {
    if (this.state.cityID !== undefined) {
      const widgetAdded = this.props.addCityWidget(this.state.cityID)
      if (!widgetAdded) {
        message.warn('Weather widget for this city has been already added.')
      }
    }
    else {
      message.warn('Please select a city from list.')
    }
  }
  transformCitiesListToLabelValuePairs(citiesList) {
    return citiesList.map((city) => ({
      label : city.name,
      value : city.id
    }))
  }
  render() {
    return (<AddWidgetView 
      citiesList={this.transformCitiesListToLabelValuePairs(this.props.citiesList)} 
      cityID={this.state.cityID}
      setSelectedCityID={this.setSelectedCityID}
      addCityWidget={this.addCityWidget}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetContainer)