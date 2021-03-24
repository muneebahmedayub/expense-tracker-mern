import * as actionTypes from './actionTypes';
import * as authApi from '../../api/authApi';
import { AuthBodyType } from '../../Types';
import setAxiosAuthHeader from '../../utils/set-axios-auth-header';
import showAlert from '../../utils/showAlert';

export const loadUser = () => async (dispatch: Function, getState: Function) => {
    dispatch({ type: actionTypes.USER_LOADING })

    const token = getState().auth.token

    if (token) {
        setAxiosAuthHeader(token)
    } else {
        return dispatch({ type: actionTypes.AUTH_ERROR })
    }

    try {
        const data = await authApi.getUser()

        dispatch({ type: actionTypes.USER_LOADED, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.AUTH_ERROR })
    }

}

export const login = ({ username, password }: AuthBodyType) => async (dispatch: Function) => {
    const body: AuthBodyType = {
        username,
        password
    }
    try {
        const data = await authApi.loginApi(body)
    
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.LOGIN_FAIL })
    }
}

export const signup = ({ username, password }: AuthBodyType) => async (dispatch: Function) => {
    const body: AuthBodyType = {
        username,
        password
    }
    try {
        const data = await authApi.signupApi(body)

        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.SIGNUP_FAIL })
    }
}

export const deleteUser = (id: string) => async (dispatch: Function) => {
    try {
        const data = await authApi.deleteUserApi(id)

        dispatch(logout())
    } catch (err) {
        showAlert('Failed to delete user', 'error')
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}