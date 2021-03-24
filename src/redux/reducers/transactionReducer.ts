import { TransactionActionType, TransactionType } from "../../Types";
import * as actionTypes from '../actions/actionTypes'

export default (state: TransactionType[] = [], action: TransactionActionType) => {
    switch (action.type) {
        case actionTypes.LOAD_TRANSACTION:
            return action.payload;
        case actionTypes.CREATE_TRANSACTION:
            return [...state, action.payload]
        case actionTypes.DELETE_TRANSACTION:
            const transactions = state.filter((transaction: TransactionType) => {
                return transaction._id !== action.payload
            })
            return transactions
        case actionTypes.EDIT_TRANSACTION:
            return [...state, action.payload]
        default:
            return state;
    }
}