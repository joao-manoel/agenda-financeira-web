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
  loading: boolean
  addExpense: (data: Expense) => void
  toggleExpense: (expenseId: string) => void
}

const _optionsCookies = {
  maxAge: 60 * 60 * 24 * 360, // 30 days
  path: '/'
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData)

export function WalletProvider({children}: WalletProviderProps): JSX.Element{
  const [wallet, setWallet] = useState<Expense[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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

  const addExpense = (data: Expense) => {
    const id = uuidv4()
    const newExpense = [...wallet, {id,...data}]
    setCookie(undefined, 'carteira.wallet', JSON.stringify(newExpense), _optionsCookies)
    setWallet(newExpense)

    toast.success('Despesa Registrada')
  }

  const toggleExpense = (expendeId: string) => {
    const updateExpense = [...wallet].filter(e => {
      if(e.id === expendeId){
        e.is_paid = !e.is_paid
      }

      return e
    })

    setCookie(undefined, 'carteira.wallet', JSON.stringify(updateExpense), _optionsCookies)
    setWallet(updateExpense)
  }

  return(
    <WalletContext.Provider value={{
      wallet, 
      loading, 
      addExpense,
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