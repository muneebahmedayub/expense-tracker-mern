import axios from 'axios'
import { TransactionType } from '../Types'

const url: string = '/transactions'

// export const fetchTracnsactions = () => axios.get(url)

export const createTransactionApi = (transaction: TransactionType) => axios.post(url, transaction)

export const removeTransactionApi = (id: string | undefined) => axios.delete(url + `/${id}`)

export const editTransactionApi = (id: string | undefined, transaction: { description: string, amount: number, income: boolean, updatedAt: string }) => axios.patch(`${url}/${id}`, transaction)
