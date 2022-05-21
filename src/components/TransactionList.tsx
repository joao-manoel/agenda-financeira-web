import { useWallet } from "../hooks/useWallet";
import { asDateDefeated, dateFormat, SortDate } from "../utils/date";
import { formatPrice } from "../utils/formatPrice";

export const TransactionList = () => {
  const {wallet, toggleExpense, loading} = useWallet()

  if(loading) return <h1>Carregando</h1>

  return (
    <section className="flex flex-col gap-y-2 p-2 relative">
      
      {wallet.sort(SortDate).sort((a, b) => {
        return (a.is_paid == b.is_paid) ? 0 : !a.is_paid ? -1 : 1
      }).map((expense) => (
        <div
          key={expense.id}
          className="flex bg-white gap-x-2 items-center p-2"
        >
          <input
            checked={expense.is_paid}
            onChange={() => toggleExpense(expense.id)}
            type="checkbox"
            className="ring-indigo-600 focus:border-indigo-600 h-6 w-6"
          />
          <section className="text-lg w-full">
            <section className="flex justify-between w-full">
              <span className={`capitalize font-bold ${expense.is_paid && 'line-through'}`}>{expense.title}</span>
              <span
                className={`${expense.is_paid && 'line-through'}`}
              >{formatPrice(expense.price)}</span>
            </section>
            <span
              className={`text-sm ${
                !expense.is_paid ? asDateDefeated(expense.pay_at) ? "bg-red-200" : "bg-green-200" : 
                'bg-zinc-200 line-through'

              }`}
            >
              Vencimento: {dateFormat(expense.pay_at)}
            </span>
          </section>
        </div>
      ))}
    </section>
  );
};
