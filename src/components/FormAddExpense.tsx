import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ChevronUpIcon} from '@heroicons/react/solid'

import { Input } from "./form/input";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";
import { DateSelect } from "./form/datepicker";

type ExpenseData = {
  title: string;
  price: number;
  pay_at: Date;
};

const FormExpenseDataSchema = yup.object().shape({
  title: yup.string().required('Titulo é obrigatório.'),
  price: yup.number().required('Valor é obrigatório.'),
  pay_at: yup.date().required('A Data de vencimento é obrigatória.')
});

export const FormAddExpense = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addExpense } = useWallet();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ExpenseData>({
    resolver: yupResolver(FormExpenseDataSchema),
  });

  const handleRegisterExpenseRequest: SubmitHandler<ExpenseData> = ({
    title,
    pay_at,
    price,
  }) => {
    addExpense({
      title,
      is_paid: false,
      pay_at,
      price,
    });
  };

  return (
    <div className="w-full p-2">
      <form className="flex flex-col gap-y-2 w-full" onSubmit={handleSubmit(handleRegisterExpenseRequest)}>
        <Input
          className={`${errors.title ? 'border-red-300' : 'border-transparent'} w-full border-2 text-2xl py-2 px-4 placeholder:font-thin text-center bg-zinc-100 rounded-md `}
          onClick={() => setIsExpanded(true)}
          control={control}
          type="text"
          name="title"
          error={errors.title}
          placeholder={isExpanded ? 'Titulo...' : 'Clique Aqui para inserir uma nova despesa...'}
          {...register("title")}
        />
        {isExpanded && (
          <>
            <div className="flex flex-col gap-y-2 w-full  xl:flex-row xl:gap-x-2 ">
              <Input
                className={`${errors.price ? 'border-red-300' : 'border-transparent'} w-full text-center placeholder:font-thin bg-zinc-100 rounded-md text-2xl border-2`}
                control={control}
                type="number"
                name="price"
                error={errors.price}
                placeholder="Valor"
                {...register("price")}
              />
              <DateSelect 
                control={control}
                type="datepicker"
                name="pay_at"
                error={errors.pay_at}
                placeholder="Pagar Quando?"
                {...register("pay_at")}
              />
              
            </div>
            <button className="bg-indigo-600 text-white text-2xl rounded-md p-2 hover:shadow-sm">Registrar</button>

            <section className='border-b-[1px] border-solid border-slate-300 relative my-8'>
              <button className="flex flex-col items-center bg-zinc-200 absolute mt-1  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onClick={() => setIsExpanded(false)}
              >                
                <ChevronUpIcon 
                  className="h-3 text-indigo-600"
                />
                <p className="text-[12px]">Ocultar Campos</p>
              </button>
            </section>
          </>
        )}
      </form>
    </div>
  );
};
