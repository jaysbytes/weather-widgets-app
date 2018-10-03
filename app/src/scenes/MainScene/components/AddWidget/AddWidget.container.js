import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddWidgetView from './AddWidget.view.jsx'

import { getCitiesList } from '../../../../services/cities.service/actions'
import { addCityWidget } from '../../../../services/weather.service/actions'

const mapStateToProps = (state, ownProps) => ({
  citiesList : state.citiesState.citiesList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCitiesList : () => {
    dispatch(getCitiesList())
  },
  addCityWidget : (cityID) => {
    dispatch(addCityWidget(cityID))
  }
})

class AddWidgetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityID : undefined
    }
  }
  componentDidMount() {
    this.props.getCitiesList()
  }
  setSelectedCityID(cityID) {
    this.setState({
      cityID
    })
  }
  addCityWidget() {
    this.props.addCityWidget(this.state.cityID)
  }
  render() {
    const autoCompleteDataSource = this.props.citiesList.map((city) => ({
      text : city.name,
      value : city.id
    }))
    return (<AddWidgetView 
      citiesList={autoCompleteDataSource} 
      setSelectedCityID={this.setSelectedCityID.bind(this)}
      cityID={this.state.cityID}
      addCityWidget={this.addCityWidget.bind(this)}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetContainer)