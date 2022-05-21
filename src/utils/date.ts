export const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const dateFormatAux = (date: Date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if(month.length < 2) month = '0' + month
  if(day.length < 2) day = '0' + day
  
  return [day, month, year].join('-')
}

export const dateFormat = (date: Date): string => {
  return dateFormatAux(date)
}

export const isDateDefeated = (date: Date): boolean => {

  var dateExpense = new Date(date)
  var dateNow = new Date()

  if(dateExpense.getTime() < dateNow.getTime()){
    return true
  }

  return false
}

export const SortDate = (a: any, b: any) => {
  const aDate = new Date(a.pay_at)
  const bDate = new Date(b.pay_at)

  return aDate.getTime() - bDate.getTime()
}