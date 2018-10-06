import io from 'socket.io-client';

import store from '../../store'
import { setCityWidgetWeather } from '../weatherWidgets.service/actions'

const socketServerUrl = "http://localhost:3001"

class Notifications {
  constructor(serviceUrl) {
    this.serviceUrl = serviceUrl
    this.socket = null
    this.eventsBounded = false
  }
  async init() {
    return new Promise((resolve, reject) => {
      if (this.socket == null) {
        const { userState } = store.getState()
        this.socket = io(this.serviceUrl, { 
          transports: [ 'websocket' ],
          query : {
            token : userState.bearerToken
          }
        });
        this.socket.on('ready', () => {
          if (!this.eventsBounded) {
            this.bindEvents()
          }
          resolve()
        })
      }
      else {
        resolve()
      }
    })
  }
  bindEvents() {
    this.eventsBounded = true
    this.socket.on('data_update', function(data) {
      store.dispatch(setCityWidgetWeather(data.cityID, data.weather))
    });
  }
}
export default new Notifications(socketServerUrl)


