import * as actionTypes from '../constants/loginForm'

export default function loginForm (state = {}, action) {
    switch (action.type) {
        case actionTypes.LOGINFORM_UPDATE:
            return action.data;
        default:
            return state
    }
}