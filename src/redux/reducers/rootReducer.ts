import { combineReducers } from 'redux';

import transactionReducer from './transactionReducer'
import authReducer from './authReducer'

export default combineReducers({
    transactions: transactionReducer,
    auth: authReducer
})
