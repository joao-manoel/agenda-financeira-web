import { useWallet } from "../hooks/useWallet"
import { formatPrice } from "../utils/formatPrice"

export const ExpenseCalc = (): JSX.Element => {
  const {wallet} = useWallet()

  const filterExpense = wallet.filter(e => {
    if(!e.is_paid) return e
  })

  const total = formatPrice(filterExpense.reduce((previousTotal, currentTotal, index) => previousTotal+parseInt(`${currentTotal.price}`), 0))
  

  return(
    <div className="w-fit p-2 bg-slate-800 my-4 m-auto flex justify-center rounded-md">
      Total: {total}
    </div>
  )
}