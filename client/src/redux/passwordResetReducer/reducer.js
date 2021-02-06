import { RESET_PASSWORD, SEND_EMAIL } from '../constants'

const initailValues = {
    verifyCode: 0
}

export default function passwordResetReducer (state = initailValues, action) {
    switch (action.type) {
        case SEND_EMAIL:
            return {
                verifyCode: action.verifyCode
            }
    
        default:
            return state
    }
}