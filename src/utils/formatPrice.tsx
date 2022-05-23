export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export const priceSanitizer = (value: string): number => {
  return parseInt(value.replace('R$', ''))
}
