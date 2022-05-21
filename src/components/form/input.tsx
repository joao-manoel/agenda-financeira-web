import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  ref: string;
  control: Control<any>;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, control, error = null, ...inputRest }: InputProps,
  ref
) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field: { ref, ...rest } }) => (
          <>
            <input id={name} {...inputRest} {...rest} ref={ref} />
          </>
        )}
      />
    </>
  );
};

export const Input = forwardRef(InputComponent);
