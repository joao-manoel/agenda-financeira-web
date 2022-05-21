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
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field: { ref, onChange, value, ...rest } }) => (
          <>
            <DatePicker
              className="w-full text-center border-none bg-zinc-100 rounded-md text-2xl placeholder:font-thin p-2 border-2"
              selected={value}
              onChange={onChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Pagar Quando?"
              {...rest}
              ref={ref}
            />
            {!!error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </>
  );
};

export const DateSelect = forwardRef(DatePickerComponent);
