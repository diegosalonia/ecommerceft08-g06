import { NEXT, PREV } from '../constants';


export const slideNext = () => {
    return {
        dispatch ({
            type: NEXT,
            payload
        })
    }
}

export const slidePrev = () => {
    return {
        dispatch ({
            type: PREV,
            payload
        })
    }
}