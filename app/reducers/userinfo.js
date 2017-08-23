import * as actionTypes from '../constants/userinfo'

export default function userinfo (state = {}, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state
    }
}