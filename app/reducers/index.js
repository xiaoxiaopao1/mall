import { combineReducers } from 'redux'
import userinfo from './userinfo'
import adminInfo from './adminInfo'


export default combineReducers({
    userinfo,
    adminInfo
})