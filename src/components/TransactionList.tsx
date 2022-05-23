import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilAltIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { toast } from "react-toastify";

import { useWallet } from "../hooks/useWallet";
import {
  isDateDefeated,
  dateFormat,
  SortDate,
  monthNames,
} from "../utils/date";
import { formatPrice } from "../utils/formatPrice";
import { MonthNavigation } from "./MonthNavigation";

export const TransactionList = () => {
  const [hashOptions, setHashOptions] = useState<string>("");
  const { ExpenseByMonth, toggleExpense, loading, removeExpense } = useWallet();

  const handleHashOptions = (id: string) => {
    if (id === hashOptions) {
      return setHashOptions("");
    } else {
      return setHashOptions(id);
    }
  };

  if (loading) return <h1>Carregando</h1>;

  return (
    <section className="flex flex-col gap-y-2 p-2 relative">
      <MonthNavigation />
      {ExpenseByMonth.length !== 0 ? (
        ExpenseByMonth.sort(SortDate)
          .sort((a, b) => {
            return a.is_paid == b.is_paid ? 0 : !a.is_paid ? -1 : 1;
          })
          .map((expense) => (
            <div 
              className="group flex gap-x-2 items-center"
              key={expense.id}
            >
              <div
                className={`${
                  hashOptions === expense.id
                    ? "border-2 border-transparent"
                    : "border-2 border-transparent"
                } flex bg-white gap-x-2 items-center p-2 relative rounded-md w-full`}
              >
                <input
                  checked={expense.is_paid}
                  onChange={() => toggleExpense(expense.id)}
                  type="checkbox"
                  className="ring-indigo-600 focus:border-indigo-600 h-6 w-6"
                />
                <section className="text-lg w-full">
                  <div>
                    <section className="flex justify-between w-full">
                      <span
                        className={`capitalize font-bold  w-full h-5 overflow-hidden ${
                          expense.is_paid && "line-through"
                        }`}
                      >
                        {expense.title}
                      </span>
                      <span className={`${expense.is_paid && "line-through"}`}>
                        {formatPrice(expense.price)}
                      </span>
                    </section>
                    <span
                      className={`text-sm ${
                        !expense.is_paid
                          ? isDateDefeated(expense.pay_at)
                            ? "bg-red-200"
                            : "bg-green-200"
                          : "bg-zinc-200 line-through"
                      }`}
                    >
                      Vencimento: {dateFormat(expense.pay_at)}
                    </span>
                  </div>
                </section>
              </div>
              <nav 
                onClick={() => handleHashOptions(expense.id)}
                className={`${hashOptions === expense.id ? 'w-48' : 'w-12 '} relative  h-20 rounded-md bg-white duration-300 flex justify-center items-center`}
              >
                <button 
                  onClick={() => toast.error(expense.id)}
                  className={`${hashOptions === expense.id ? 'w-10 h-10 -translate-x-11 flex items-center justify-center hover:bg-red-400 cursor-pointer text-zinc-700 hover:text-white' : 'w-2 h-2 -translate-y-3'} absolute bg-zinc-300 rounded-full duration-500 border-[2px]`}>
                  {/* Feature */}
                  <XIcon className={`${hashOptions === expense.id ? 'scale-100' : 'scale-0'} h-4 duration-700 `}/>
                </button>
                <button 
                  onClick={() => toast.error(expense.id)}
                  className={`${hashOptions === expense.id ? 'w-10 h-10 flex items-center justify-center hover:bg-green-400 cursor-pointer text-zinc-700 hover:text-white' : 'w-2 h-2 '} absolute bg-zinc-300 rounded-full duration-500 border-[2px]`}
                >
                  {/* Editar */}
                  <PencilAltIcon className={`${hashOptions === expense.id ? 'scale-100' : 'scale-0'} h-4 duration-700`}/>
                </button>
                <button 
                  onClick={() => removeExpense(expense.id)}
                  className={`${hashOptions === expense.id ? 'w-10 h-10 translate-x-11 flex items-center justify-center hover:bg-red-400 cursor-pointer text-zinc-700 hover:text-white' : 'w-2 h-2 translate-y-3 '} absolute bg-zinc-300 rounded-full duration-500 border-[2px]`}
                >
                  {/* Deletar */}
                  <TrashIcon className={`${hashOptions === expense.id ? 'scale-100' : 'scale-0'} h-4 duration-700 `} />
                </button>
              </nav>
            </div>
          ))
      ) : (
        <h1 className="text-center font-thin">Sem Registro</h1>
      )}
    </section>
  );
};
