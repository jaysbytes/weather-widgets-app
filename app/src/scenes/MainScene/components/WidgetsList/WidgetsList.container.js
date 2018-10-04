import { connect } from 'react-redux'

import WidgetListView from './WidgetsList.view.jsx'

const mapStateToProps = (state, ownProps) => ({
  widgetsList : state.weatherWidgetsState.weatherWidgetsList
})

export default connect(mapStateToProps)(WidgetListView)