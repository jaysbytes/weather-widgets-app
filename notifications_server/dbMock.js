import path from 'path'
import fs from 'fs'

const dataFilePath = path.join(__dirname, 'data.json')
const saveData = (data) => {
  return fs.writeFileSync(dataFilePath, JSON.stringify(data))
}
const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath))
  }
  catch(e) {
    return {
      users : {},
      hooks : []
    }
  }
}

export const addUserSubscription = (userToken, cityID) => {
  const data = loadData()
  const userData = data.users[userToken] ? new Set(data.users[userToken]) : new Set()
  userData.add(cityID)
  data.users[userToken] = userData
  saveData(data)
}
export const removeUserSubscription = (userToken, cityID) => {
  const data = loadData()
  const userData = data.users[userToken]
  if (userData) {
    const cityIndex = userData.indexOf(cityID)
    if (cityIndex !== undefined) {
      userData.splice(cityIndex, 1)
      saveData(data)
    }
  }
}
export const getCitySubscribers = (cityID) => {
  const data = loadData()
  const users = Object.keys(data.users).filter((userToken) => (data.users[userToken].includes(cityID)))
  return users
}

export const addHook = (cityID) => {
  const data = loadData()
  const hooks = data.hooks ? new Set(data.hooks) : new Set()
  hooks.add(cityID)
  data.hooks = hooks
  saveData(data)
}
export const removeHook = (cityID) => {
  const data = loadData()
  const hookIndex = data.hooks.indexOf(cityID)
  if (hookIndex !== undefined) {
    data.hooks.splice(hookIndex, 1)
    saveData(data)
  }
}
export const hasActiveHook = (cityID) => {
  const data = loadData()
  return data.hooks.includes(cityID)
}
