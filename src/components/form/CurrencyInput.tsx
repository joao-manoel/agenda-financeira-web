import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import MaskedInput from 'react-text-mask'
import { createNumberMask } from "text-mask-addons";

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  control: Control<any>;
}

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, 
  integerLimit: 7, 
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  CurrencyInputProps
> = (
  { name, label, control, error = null, ...inputProps }: CurrencyInputProps, ref
) => {

  const currencyMask = createNumberMask(defaultMaskOptions)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <MaskedInput mask={currencyMask} id={name} {...inputProps} {...rest} ref={ref} inputMode="numeric" />
      )}
    />
  );
};


export const CurrencyInput = forwardRef(CurrencyInputComponent);