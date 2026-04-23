import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNextMeetingDate = () => {
  const now = new Date()
  const nextSunday = new Date(now)

  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7))

  // if (now.getDay() === 0) nextSunday.setDate(nextSunday.getDate() + 7);

  const isLastSunday = (date: Date) => {
    const d = new Date(date)
    d.setDate(d.getDate() + 7)
    return d.getMonth() !== date.getMonth()
  }

  if (isLastSunday(nextSunday)) {
    nextSunday.setDate(nextSunday.getDate() + 7)
  }

  return nextSunday.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
