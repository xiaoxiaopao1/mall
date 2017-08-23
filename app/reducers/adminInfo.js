import * as actionTypes from '../constants/adminInfo'

export default function adminInfo (state = {}, action) {
    switch (action.type) {
        case actionTypes.ADMIN_UPDATE:
            return action.data;
        default:
            return state
    }
}