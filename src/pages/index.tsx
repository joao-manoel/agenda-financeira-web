import type { NextPage } from 'next'

import { ListExpense } from '../components/listExpense'
import { Header } from '../components/Header'
import { useWallet } from '../hooks/useWallet'
import { ModalAddExpense } from '../components/ModalAddExpense'
import { useState } from 'react'
import { ExpenseCalc } from '../components/ExpenseCalc'



const Home: NextPage = () => {
  const [isOpenModalAddExpense, setIsOpenModalAddExpense] = useState<boolean>(false)
  const {wallet, addExpense} = useWallet()

  return (
    <div>
      <Header />
      <ModalAddExpense isOpen={isOpenModalAddExpense}  setIsOpen={setIsOpenModalAddExpense}/>
      <ExpenseCalc />
      <button 
        onClick={(() => setIsOpenModalAddExpense(true))}
        className="w-52 p-4 bg-slate-800 my-4 m-auto flex justify-center rounded-md">Registrar Nova Despesa</button>
      <ListExpense data={wallet} />
    </div>
  )
}

export default Home
