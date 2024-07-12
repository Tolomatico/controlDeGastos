import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const {state,dispatch,available}=useBudget()
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date()
    })

    const [previusAmount,setPreviusAmount]=useState(0)
    const [error,setError]=useState("")

    useEffect(()=>{
        if(state.editingId){
            const editingExpense=state.expense.filter(exp=>exp.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviusAmount(editingExpense.amount)
        }   

    },[state.editingId])

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange=(e :ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)=>{
        const {name,value}=e.target
        const isAmountField=[name].includes("amount")
       setExpense({...expense,
        [name]:isAmountField ? +value : value
       })


    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(expense).includes("")) {
          return setError("Todos los campos son obligatorios")
        } 
        if((expense.amount-previusAmount ) > available ){
           return setError("No tienes suficiente dinero")
        }


        if(state.editingId){

        dispatch({type:"update-expense",payload:{expense:{...expense,id:state.editingId}}})
        }else {

            dispatch({type:"add-expense",payload:{expense:expense}})
        }

       
        setExpense({
            amount: 0,
            expenseName: "",
            category: "",
            date: new Date()
        })
        setPreviusAmount(0)
    }


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase font-black text-center text-2xl border-b-4 border-blue-500">
              {state.editingId ? "Actualizar Gasto" : " Nuevo Gasto"}  
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre de Gasto:</label>
                <input
                    className="bg-slate-100 p-2"
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    value={expense.expenseName}
                   onChange={handleChange} />

            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input
                    className="bg-slate-100 p-2"
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Categoría:</label>
                <select
                    name="category"
                    id="category"
                    className="bg-slate-100 p-2"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option

                    >--Seleccione--
                    </option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}

                        >{category.name}</option>

                    ))}

                </select>

            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"

                >Fecha de Gasto:</label>
                <DatePicker
                    value={expense.date}
                    className="bg-slate-100 p-2"
                    onChange={handleChangeDate}
                />

            </div>

            <input
                type="submit"
                className="p-2 bg-blue-600 cursor-pointer w-full text-white rounded-lg uppercase font-bold"
                value=  {state.editingId ? "Actualizar Gasto" : " Nuevo Gasto"}  

            />

        </form>
    )
}
