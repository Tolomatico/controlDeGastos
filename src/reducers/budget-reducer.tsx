import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense["id"] } } |
    { type: "get-expense-by-id", payload: { id: Expense["id"] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "restart-app" } |
    { type: "filter-category", payload: { id: Category["id"] } }


export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense["id"]
    currentCategory:Category["id"]
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem("budget")
    return localStorageBudget ? +localStorageBudget : 0

}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem("expenses")
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expense: localStorageExpenses(),
    editingId: "",
    currentCategory:""
}

const createExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}

export const BudgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === "add-budget") {

        return {
            ...state,
            budget: action.payload.budget
        }

    }
    if (action.type === "show-modal") {

        return {
            ...state,
            modal: true
        }
    }
    if (action.type === "close-modal") {

        return {
            ...state,
            modal: false,
            editingId: ""
        }
    }
    if (action.type === "add-expense") {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false
        }
    }

    if (action.type === "remove-expense") {

        return {
            ...state,
            expense: state.expense.filter(expense => expense.id !== action.payload.id)

        }
    }
    if (action.type === "get-expense-by-id") {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true

        }
    }

    if (action.type === "update-expense") {


        return {
            ...state,
            modal: false,
            expense: state.expense.map(exp =>
                exp.id === action.payload.expense.id ?
                    action.payload.expense : exp),
            editingId: ""
        }
    }

    if (action.type === "restart-app") {

        return {
            ...state,
            budget: 0,
            expense: []
        }
    }

    if(action.type==="filter-category"){

        return{
            ...state,
            currentCategory:action.payload.id
        }
    }


    return state

}