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
          <div>
            <DatePicker
              className="border-zinc-300 border-2 rounded-md px-2 py-[2px] w-full md:w-32"
              selected={value}
              onChange={onChange}
              dateFormat="dd/MM/yyyy"
              {...rest}
              ref={ref}
            />
            {!!error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </div>
        )}
      />
    </>
  );
};

export const DateSelect = forwardRef(DatePickerComponent);
