import { LOGOUT_FROM_SITE } from './actionTypes'

export const logOut = () => {
    console.log('action')
    return {
        type: LOGOUT_FROM_SITE,
        payload: {}
    }
}
