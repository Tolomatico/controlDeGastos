import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>
    totalExpenses:number
    available:number
}
type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(BudgetReducer, initialState)

    const totalExpenses = useMemo(() =>
        state.expense.reduce((total, exp) =>
          exp.amount + total
          , 0)
    
        , [state.expense])
    
      const available = state.budget - totalExpenses
    return (
        <BudgetContext.Provider value={{ state, dispatch,totalExpenses,available }}>
            {children}
        </BudgetContext.Provider>
    )
}