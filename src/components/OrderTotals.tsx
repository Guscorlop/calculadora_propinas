import { Dispatch, useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  dispatch: Dispatch<OrderActions>
}


export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {

  const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])
  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, subTotalAmount])
  const total = useMemo(() => subTotalAmount + tipAmount, [subTotalAmount, tipAmount])

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-bold text-2xl">Totales y Propinas</h2>
        <p>Subtotal a pagar:  {''}
          <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>
        <p>Propina: {''}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>Total: {''}
          <span className="font-bold">{formatCurrency(total)}</span>
        </p>
      </div>

      <button className="w-full p-3 text-white mt-10 text-center bg-black disabled:opacity-10"
        disabled={total === 0}
        onClick={() => dispatch({ type: 'place-order' })}>
        Guardar Orden
      </button>

    </>
  )
}
