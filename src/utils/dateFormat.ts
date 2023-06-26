import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const dateFormat = (date: Date) => {
  const dateISO = parseISO(date.toString())

  const formattedDate = format(dateISO, "dd 'de' MMMM' às ' HH:mm'h'", {
    locale: ptBR,
  })

  return formattedDate
}
