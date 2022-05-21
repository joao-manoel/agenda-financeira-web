import React, { ForwardRefRenderFunction, InputHTMLAttributes,forwardRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  ref: string;
  control: Control<any>;
}

const DatePickerComponent: ForwardRefRenderFunction<HTMLInputElement, DatePickerProps> = (
  { name, label, control, error = null, ...inputRest }: DatePickerProps,
  ref
) => {
  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field: { ref, onChange, value, ...rest } }) => (
          <>
            <DatePicker
              className={`w-full text-center border-2 bg-zinc-100 rounded-md text-2xl placeholder:font-thin p-2 ${error && 'border-red-300 '}`}
              selected={value}
              onChange={onChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data de Vencimento"
              {...rest}
              ref={ref}
              showPreviousMonths={false}
              
            />
          </>
        )}
      />
    </div>
  );
};

export const DateSelect = forwardRef(DatePickerComponent);
