import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import MainScene from './scenes/MainScene';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
  	<MainScene/>
  </Provider>,
  document.getElementById('root')
)

