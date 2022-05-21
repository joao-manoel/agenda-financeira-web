import {DotsHorizontalIcon} from '@heroicons/react/solid'
import { Popover } from "@headlessui/react"
import { Expense } from "../types"
import { useWallet } from '../hooks/useWallet'

interface listExpenseProps {
  data: Expense[]
}

export const ListExpense = ({data}: listExpenseProps): JSX.Element => {
  const {toggleExpense} = useWallet()

  return(
    <div className="w-2/3 md:w-2/4 m-auto my-3  flex flex-col gap-y-4">
      {data.map((expense) => (
        <div className="flex flex-col border-b-[2px] border-slate-800 p-3" key={expense.id}>
          <div className="flex items-center gap-x-2 relative">
            <input type="checkbox" checked={expense.is_paid} className="w-3 h-3 bg-black border-slate-700 rounded-sm" onChange={() => toggleExpense(expense.id)}/>
            <h2 className={`font-roboto font-medium ${expense.is_paid && 'line-through'}`}>{expense.title}</h2>
            <span className={`bg-slate-800 py-[3px] px-[6px] text-[10px] rounded-md ${expense.is_paid && 'line-through'}`}>R$ {expense.price}</span>
            <Popover>
              <Popover.Button className='absolute right-0 hover:bg-slate-800 py-[4px] px-[4px] rounded-md transition-all'>
                <DotsHorizontalIcon
                  className='h-2'
                />
              </Popover.Button>
              <Popover.Panel>
                <div className="absolute right-0 top-7 bg-slate-800 rounded-md font-sm p-[2px]">
                  <button className="text-[10px] px-2 hover:text-zinc-400">Deletar</button>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          
          <span className="font-thin text-[9px] mx-5">Vence dia {expense.pay_at}</span>
        </div>
      ))}
    </div>
  )
}