import { LOGOUT_FROM_SITE } from './actionTypes'

export const logOut = () => {
    return {
        type: LOGOUT_FROM_SITE,
        payload: {}
    }
}
