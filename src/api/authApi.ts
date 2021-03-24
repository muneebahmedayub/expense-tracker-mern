import axios from 'axios'
import { AuthBodyType } from '../Types'

export const getUser = () => axios.get('/auth/user')

export const loginApi = (body: AuthBodyType) => axios.post('/auth/login', body)

export const signupApi = (body: AuthBodyType) => axios.post('/auth/signup', body)

export const deleteUserApi = (id: string) => axios.delete(`/auth/delete/${id}`)