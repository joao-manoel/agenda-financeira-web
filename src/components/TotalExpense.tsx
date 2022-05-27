import { ChartPieIcon } from "@heroicons/react/solid";
import { useWallet } from "../hooks/useWallet";
import { formatPrice } from "../utils/formatPrice";

export const TotalExpense = () => {
  const {ExpenseByMonth} = useWallet()

  const filterExpense = ExpenseByMonth.filter(e => {
    if(!e.is_paid) return e
  })

  const total = formatPrice(filterExpense.reduce((previousTotal, currentTotal) => previousTotal+parseInt(`${currentTotal.price}`), 0))
  
  return (
    <div className="text-lg sm:text-2xl flex flex-col items-center justify-center text-zinc-700 bg-white w-full md:w-fit h-fit mb-3 py-2 px-4 rounded-xl shadow-md">
      <span className="flex items-center justify-center gap-x-2">
        <ChartPieIcon className="h-4" />
        Total de Despesas:
      </span>
      <span className=''>{total}</span>
    </div>
  );
};
