import { addDays, endOfMonth, isSameDay, nextSunday, isBefore } from 'date-fns'

export const getNextCellSunday = () => {
  // 1. Get the current time
  const now = new Date()

  // 2. Find the upcoming Sunday
  let date = nextSunday(now)

  // 3. Logic to find the LAST Sunday of the current month
  // We get the end of the month and find its previous Sunday
  const monthEnd = endOfMonth(date)

  // A common trick to find the last Sunday:
  // Get the next Sunday after the 23rd of the month
  const lastSundayOfMonth = nextSunday(addDays(monthEnd, -7))

  // 4. If the upcoming Sunday is that last Sunday, skip to the next one
  if (isSameDay(date, lastSundayOfMonth)) {
    date = addDays(date, 7)
  }

  return date
}
