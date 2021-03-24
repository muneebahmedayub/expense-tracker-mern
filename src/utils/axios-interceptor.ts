import axios, { AxiosError, AxiosResponse } from 'axios'
import showAlert from './showAlert'
import store from '../redux/store'
import { logout } from '../redux/actions/authActions'

const axiosInterceptor = () => {
    const baseUrl = 'https://muneeb-expense-tracker.herokuapp.com/'
    // const baseUrl = 'http://localhost:5000'

    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    
    axios.interceptors.response.use(
        async (response: AxiosResponse): Promise<any> => {
            if(response.status >= 200 && response.status <= 300) {
                return response.data
            }
        },
        (error: AxiosError) => {
            const { response, request }: { response?: AxiosResponse, request?: XMLHttpRequest } = error

            if(response) {
                if(response.status >= 400 && response.status <= 500) {
                    showAlert(response.data?.error, 'error')
                    if(response.status === 401) {
                        store.dispatch(logout())
                    }
                    return null
                }
            }
            else if (request) {
                showAlert('Request failed please try again', 'error')
                return null
            }
            return Promise.reject(error)
        }
    )
}

export default axiosInterceptor