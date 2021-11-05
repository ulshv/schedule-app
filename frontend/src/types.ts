export type TService = {
  id: number
  name: string
}

export type TSchedule = {
  id: number
  name: string
  duration: number
  cron: string
  date: number
  isRepeating: boolean
  isActive: boolean
  services: TService[]
}
