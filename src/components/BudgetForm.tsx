import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

    const { dispatch } = useBudget()
    const [budget, setBudget] = useState(0)

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault
        setBudget(e.target.valueAsNumber)

    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:"add-budget",payload:{budget:budget}})

    }
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label
                    htmlFor="budget"
                    className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto

                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={onHandleChange}

                />

            </div>

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700
             cursor-pointer w-full
             p-2 text-white font-black uppercase text-center
             disabled:opacity-10
             "
                disabled={isValid}
            />
        </form>
    )
}
