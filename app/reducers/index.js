import { combineReducers } from 'redux'
import userInfo from './userInfo'
import adminInfo from './adminInfo'
import loginForm from './loginForm'


export default combineReducers({
    userInfo,
    adminInfo,
    loginForm
})