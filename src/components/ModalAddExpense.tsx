import { useState } from "react"
import { Dialog } from '@headlessui/react'
import { SubmitHandler, useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {XIcon} from "@heroicons/react/solid"

import { useWallet } from "../hooks/useWallet"
import { dateFormat } from "../utils/dateformat"
import { Input } from "./form/input"
import { DateSelect } from "./form/datepicker"

type ExpenseData = {
  name: string
  value: number
  pay_at: Date
}

const FormExpenseDataSchema = yup.object().shape({

})

interface ModalProps {
  isOpen: boolean
  setIsOpen(value: boolean): void
}


export const ModalAddExpense = ({isOpen, setIsOpen}: ModalProps): JSX.Element => {
  const {wallet, addExpense} = useWallet()

  const { register, handleSubmit, formState: { errors }, control} = useForm<ExpenseData>({
    resolver: yupResolver(FormExpenseDataSchema)
  })
  
  const handleRegisterExpenseRequest: SubmitHandler<ExpenseData> = ({name, pay_at, value}) => {
    addExpense({
      title: name,
      is_paid: false,
      pay_at: dateFormat(pay_at),
      price: value
    })
  }
  return(
    <Dialog 
      className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md text-zinc-600 py-2 px-4 rounded-md"
      open={isOpen} onClose={() => setIsOpen(false)}
      >
      <Dialog.Panel>
        <Dialog.Title className="flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <XIcon className="h-4"/>
          </button>
        </Dialog.Title>

        <form className="p-2 flex flex-col gap-y-2" onSubmit={handleSubmit(handleRegisterExpenseRequest)}>
          <Input
            className="border-zinc-300 border-2 rounded-md px-2 py-[2px] w-full"
            control={control}
            name='name'
            type="text"
            error={errors.name}
            {...register('name')}
            placeholder='Titulo'
          />
          <div className="flex gap-2 flex-col md:flex-row">
            <Input
              className="border-zinc-300 border-2 rounded-md px-2 py-[2px] w-full md:w-32"
              control={control}
              name='value'
              type="number"
              error={errors.name}
              {...register('value')}
              placeholder='R$'
            />
            <DateSelect
              control={control}
              name='pay_at'
              {...register('pay_at')}
            />
          </div>

          <button
            className="bg-slate-900 text-white font-roboto rounded-md py-[4px]"
          >Finalizar</button>
        </form>

      </Dialog.Panel>
    </Dialog>
  )
}