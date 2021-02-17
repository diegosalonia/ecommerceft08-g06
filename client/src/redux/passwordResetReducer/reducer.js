import { RESET_PASSWORD, CHANGE_PASSWORD } from '../constants'

const initailValues = {
    status: false
}

export default function passwordResetReducer (state = initailValues, action) {
    switch (action.type) {
        case RESET_PASSWORD:
            return{
                status:true
            }
        case CHANGE_PASSWORD:
            return {
                status:true
            }
        default:
            return state
    }
}