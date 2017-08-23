import * as actionTypes from '../constants/adminInfo'

export function update(data) {
    return {
        type: actionTypes.ADMININFO_UPDATE,
        data
    }
} 