import { createContext, ReactNode, useState, useContext } from "react"
import { toast } from "react-toastify"
import {v4 as uuidv4} from 'uuid'
import {parseCookies, setCookie, destroyCookie} from 'nookies'

import { Expense } from "../types"
import { useEffect } from "react"

interface WalletProviderProps {
  children: ReactNode
}

interface WalletContextData {
  wallet: Expense[]
  ExpenseByMonth: Expense[]
  loading: boolean
  month: number
  handleNextMonth: () => void
  handlePreviusMonth: () => void
  addExpense: (data: Expense) => void
  toggleExpense: (expenseId: string) => void
  removeExpense: (expenseId: string) => void
}

const _optionsCookies = {
  maxAge: 60 * 60 * 24 * 360, // 30 days
  path: '/'
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData)

export function WalletProvider({children}: WalletProviderProps): JSX.Element{
  const [wallet, setWallet] = useState<Expense[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [month, setMonth] = useState(() => new Date().getMonth() + 1)

  useEffect(() => {
    try{
      const {'carteira.wallet': walletStorage} = parseCookies()

      if(walletStorage){
        setWallet(JSON.parse(walletStorage))
      }

      setLoading(false)
    }catch(err){

    }
  }, [])

  const handleNextMonth = () => {
    if(month < 12) {
      setMonth(month+1)
    }
  }

  const handlePreviusMonth = () => {
    if(month > 1) {
      setMonth(month-1)
    }
  }
  
  const ExpenseByMonth = wallet.filter(expense => {
    const getMonth = new Date(expense.pay_at).getMonth() + 1
    
    if(month === getMonth){
      return expense
    }
  })

  const addExpense = (data: Expense) => {
    const id = uuidv4()
    const newExpense = [...wallet, {id, pay_at: new Date(data.pay_at),...data}]
    setCookie(undefined, 'carteira.wallet', JSON.stringify(newExpense), _optionsCookies)
    setWallet(newExpense)

    toast.success('Despesa Registrada')
  }

  const toggleExpense = (expenseId: string) => {
    const updateExpense = [...wallet].filter(e => {
      if(e.id === expenseId){
        e.is_paid = !e.is_paid
      }

      return e
    })

    setCookie(undefined, 'carteira.wallet', JSON.stringify(updateExpense), _optionsCookies)
    setWallet(updateExpense)
  }

  const removeExpense = (expenseId: string) => {

    const removeExpense = [...wallet].filter(e => {
      return e["id"] !== expenseId
    })

    setCookie(undefined, 'carteira.wallet', JSON.stringify(removeExpense), _optionsCookies)
    setWallet(removeExpense)
  }

  return(
    <WalletContext.Provider value={{
      wallet,
      ExpenseByMonth, 
      loading, 
      month,
      removeExpense,
      addExpense,
      handleNextMonth,
      handlePreviusMonth,
      toggleExpense
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet(): WalletContextData {
  const context = useContext(WalletContext)

  return context
}