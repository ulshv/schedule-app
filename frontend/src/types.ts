export type TService = {
  id: number
  name: string
}

export type TSchedule = {
  id: number
  name: string
  duration: number
  cron: string
  isRepeating: boolean
  isActive: boolean
  services: TService[]
}
