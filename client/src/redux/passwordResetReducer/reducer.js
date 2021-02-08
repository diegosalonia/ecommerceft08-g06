import { RESET_PASSWORD, SEND_EMAIL, CHANGE_PASSWORD } from '../constants'

const initailValues = {
    verifyCode: 0
}

export default function passwordResetReducer (state = initailValues, action) {
    switch (action.type) {
        case SEND_EMAIL:
            return {
                verifyCode: action.verifyCode
            }
        case RESET_PASSWORD:
            return{
                verifyCode:initailValues.verifyCode
            }
        case CHANGE_PASSWORD:
            return {
                verifyCode:initailValues.verifyCode
            }
        default:
            return state
    }
}