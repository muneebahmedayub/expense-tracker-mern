import * as actionTypes from './actionTypes'
import * as transactionApi from '../../api/transactionApi'
import gsap from 'gsap'
import { TransactionType } from '../../Types'
import { RefObject } from 'react'
import dayjs from 'dayjs'

export const loadTransactions = (transactions: TransactionType[]) => {
    const sortedTransactions = transactions.sort((a: TransactionType, b: TransactionType) => {
        return dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix()
    })
    return {
        type: actionTypes.LOAD_TRANSACTION,
        payload: sortedTransactions
    }
}

export const createTransaction = (transaction: TransactionType) => async (dispatch: any) => {
    try {
        const { data } = await transactionApi.createTransactionApi(transaction)
        dispatch({ type: actionTypes.CREATE_TRANSACTION, payload: data })
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteTransaction = (id: string | undefined, ObjRef: RefObject<HTMLDivElement>, allRef: RefObject<HTMLDivElement[]>) => async (dispatch: any) => {
    try {
        if (ObjRef.current === null || allRef.current === null) {
        } else {
            const index = allRef.current.indexOf(ObjRef.current);
            gsap.to(allRef.current.slice(0, index), {
                duration: 0.5,
                translateY: "-100%",
                ease: "circ.out",
            });
            await transactionApi.removeTransactionApi(id)
            gsap.to(allRef.current.slice(0, index), {
                duration: 0,
                translateY: "0",
                ease: "circ.out",
            });
            gsap.to(allRef.current, { duration: 0, pointerEvents: 'all' })
        }
        dispatch({ type: actionTypes.DELETE_TRANSACTION, payload: id })
    } catch (err) {
        console.log(err.message)
    }
}

export const editTransaction = (id: string | undefined, transaction: { description: string, amount: number, income: boolean, updatedAt: string }) => async (dispatch: any) => {
    try {
        const { data } = await transactionApi.editTransactionApi(id, transaction)
        dispatch({ type: actionTypes.EDIT_TRANSACTION, payload: data })
    } catch (err) {
        console.log(err)
    }
}