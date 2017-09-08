import * as actionTypes from '../constants/userInfo'

export default function userInfo (state = {}, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state
    }
}