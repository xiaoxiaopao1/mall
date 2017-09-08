import * as actionTypes from '../constants/loginForm'

export function update(data) {
    return {
        type: actionTypes.LOGINFORM_UPDATE,
        data
    }
} 