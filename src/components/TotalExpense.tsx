import { ChartBarIcon } from "@heroicons/react/solid";
import { useWallet } from "../hooks/useWallet";
import { formatPrice } from "../utils/formatPrice";

export const TotalExpense = () => {
  const {wallet} = useWallet()

  const filterExpense = wallet.filter(e => {
    if(!e.is_paid) return e
  })

  const total = formatPrice(filterExpense.reduce((previousTotal, currentTotal, index) => previousTotal+parseInt(`${currentTotal.price}`), 0))
  
  return (
    <div className="text-2xl flex flex-col justify-center text-zinc-700 bg-white w-fit h-fit py-2 px-4 rounded-xl shadow-md">
      <span className="flex items-center justify-center gap-x-2">
        <ChartBarIcon className="h-4" />
        Total:
      </span>
      <span className=''>{total}</span>
    </div>
  );
};
