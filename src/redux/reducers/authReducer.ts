import setAxiosAuthHeader from '../../utils/set-axios-auth-header';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.SIGNUP_FAIL:
        case actionTypes.LOGOUT:
            localStorage.removeItem('token')
            setAxiosAuthHeader()
            return {
                isLoading: false,
                token: null,
                isAuthenticated: false,
                user: null,
            }
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.SIGNUP_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            setAxiosAuthHeader(action.payload.token)
            return {
                isLoading: false,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user
            }
        default:
            return state
    }
}