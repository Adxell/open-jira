import {formatDistanceToNow} from 'date-fns'
import { es } from 'date-fns/locale'

export const getFormatDistanceToNow = (date: number) => {
   const formNow = formatDistanceToNow(date, {locale: es})
   
   return `hace ${formNow}`;
}