import React, { Component } from 'react'

import MainSceneView from './MainScene.view';
import NotificationService from '../../services/notification.service'

export default class MainScene extends Component {
  componentDidMount() {
    NotificationService.init()
  }
  render() {
    return <MainSceneView/>
  }
}