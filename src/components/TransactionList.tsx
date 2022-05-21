import { ChevronLeftIcon, ChevronRightIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";

import { useWallet } from "../hooks/useWallet";
import { isDateDefeated, dateFormat, SortDate, monthNames } from "../utils/date";
import { formatPrice } from "../utils/formatPrice";
import { MonthNavigation } from "./MonthNavigation";

export const TransactionList = () => {
  const [hashOptions, setHashOptions] = useState<string>("")
  const { ExpenseByMonth, toggleExpense, loading } = useWallet()

  const handleHashOptions = (id: string) => {
    if (id === hashOptions) {
      return setHashOptions("");
    } else {
      return setHashOptions(id);
    }
  };

  if (loading) return <h1>Carregando</h1>

  return (
    <section className="flex flex-col gap-y-2 p-2 relative">
      <MonthNavigation />
      {ExpenseByMonth.length !== 0 ? (
        ExpenseByMonth
        .sort(SortDate)
        .sort((a, b) => {
          return a.is_paid == b.is_paid ? 0 : !a.is_paid ? -1 : 1;
        })
        .map((expense) => (
          <>
            <div
              key={expense.id}
              className={`${
                hashOptions === expense.id
                  ? " border-2 border-indigo-400"
                  : "border-2 border-transparent"
              } flex bg-white gap-x-2 items-center p-2 relative rounded-md`}
              onClick={() => handleHashOptions(expense.id)}
            >
              <input
                checked={expense.is_paid}
                onChange={() => toggleExpense(expense.id)}
                type="checkbox"
                className="ring-indigo-600 focus:border-indigo-600 h-6 w-6"
              />
              <section className="text-lg w-full">
                <section className="flex justify-between w-full">
                  <span
                    className={`capitalize font-bold ${
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
              </section>
              <section
                className={`${
                  hashOptions === expense.id ? "flex-block" : "hidden"
                } right-1 -bottom-1 py-2 flex justify-end gap-x-2 absolute`}
              >
                <button className="flex items-center text-white bg-red-400 py-[3px] px-2 rounded-md">
                  <TrashIcon className="h-5 " />
                </button>
                <button className="flex items-center text-white bg-zinc-800 py-[3px] px-2 rounded-md">
                  <PencilAltIcon className="h-5 " />
                </button>
              </section>
            </div>
          </>
        ))
      ) : (
        <h1>Sem Registro</h1>
      )}
    </section>
  );
};
