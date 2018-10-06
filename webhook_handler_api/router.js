import express from 'express'

import * as DB from './dbMock'
import * as hookServiceAdapter from './hookServiceAdapter'

const ioEventTypes = {
  'data_update' : 'data_update'
}

const router = (ownHost, ioEmmiter) => {
  const mainRouter = express.Router()

  mainRouter.post('/subscribtion/:cityID', async (req, res, next) => {
    const { cityID } = req.params
    const { token } = req
    const notificationUrl = `${ownHost}/notification/${cityID}`
    if (!DB.hasActiveHook(cityID)) {
      const result = await hookServiceAdapter.subscribe(token, cityID, notificationUrl)
      if (result) {
        DB.addHook(cityID)
      }
      else {
        res.status(500)
        res.json({
          success : false
        })
      }
    }
    DB.addUserSubscription(token, cityID)
    res.status(200)
    res.json({
      success : true
    })    
  })

  mainRouter.delete('/subscribtion/:cityID', async (req, res, next) => {
    const { cityID } = req.params
    const { token } = req

    const result = await hookServiceAdapter.unsubscribe(token, cityID)
    if (result) {
      DB.removeUserSubscription(token, cityID)
      if (DB.getCitySubscribers(cityID).length === 0) {
        DB.removeHook(cityID)
      }
      res.status(200)
      res.json({
        success : true
      })
    }
    else {
      res.status(500)
      res.json({
        success : false
      })
    }
  })
  mainRouter.post('/notification/:cityID', (req, res, next) => {
    const { cityID } = req.params
    const { token } = req
    const citySubscribers = DB.getCitySubscribers(cityID)
    
    citySubscribers.forEach((token) => {
      ioEmmiter.to(token).emit(ioEventTypes.data_update, { cityID, weather : req.body })
    })
    res.end()
  })

  return mainRouter
}

export default router