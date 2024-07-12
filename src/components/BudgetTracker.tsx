import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import {CircularProgressbar,buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

  const { state ,totalExpenses,available,dispatch} = useBudget()

 const porcentaje=+((totalExpenses/state.budget)*100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
      <CircularProgressbar
      styles={buildStyles({
        pathColor:porcentaje ===100 ? "red" : "#3b82f6",
        trailColor:"#f5f5f5",
        textSize:"8px",
        textColor:"#3b82f6"
        
      })}
      value={porcentaje}
      text={`${porcentaje}% Gastado`}
      />
    
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          onClick={()=>dispatch({type:"restart-app"})}
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Resetear App
        </button>
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Disponible"
          amount={available}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}

        />
      </div>
    </div>
  )
}
