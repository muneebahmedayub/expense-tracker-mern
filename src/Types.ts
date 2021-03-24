import { RefObject } from "react"
import reducers from "./redux/reducers/rootReducer"

export type HeaderProp = {
    HeaderRef: RefObject<HTMLDivElement>
}
export type TransactionType = {
    _id?: string
    description: string
    amount: number
    income: boolean
    updatedAt: string
}

export type TransactionHistoryProp = {
    addToRef: (el: RefObject<HTMLDivElement>) => void
    handleDelete: (id: string | undefined, ObjRef: RefObject<HTMLDivElement>) => void
    handleEditIcon: (id: string | undefined, description: string, amount: number, income: boolean, ObjRef: RefObject<HTMLDivElement>) => void
    TransactionHistoryRef: RefObject<HTMLDivElement>
}

export type InfoProp = {
    isEditing: boolean
    setIsEditing: (isLoading: boolean) => void
    value: number
    setValue: (value: number) => void
    description: string
    setDescription: (description: string) => void
    amount: number
    setAmount: (amount: number) => void
    cancelEditing: () => void
    handleEditButton: (value: number, setIsLoading: (isLoading: boolean) => void) => void
    InfoRef: RefObject<HTMLDivElement>
    allRef: RefObject<HTMLDivElement[]>
}

export type TransactionProp = {
    addToRef: (el: RefObject<HTMLDivElement>) => void
    id: string | undefined
    description: string
    amount: number
    income: boolean
    handleDelete: (id: string | undefined, ObjRef: RefObject<HTMLDivElement>) => void
    handleEditIcon: (id: string | undefined, description: string, amount: number, income: boolean, ObjRef: RefObject<HTMLDivElement>) => void
}

export type TransactionActionType = {
    type: string
    payload: any
}

export type TransactionReducerType = {
    state: TransactionType[]
    action: TransactionActionType
}

export type ConfigHeaderType = {
    headers: {
        [index: string]: string
    }
}

export type AuthBodyType = {
    username: string
    password: string
}

export type RootState = ReturnType<typeof reducers>