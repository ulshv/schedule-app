import { Router } from 'express'
import { prisma } from '../prisma'
import { asyncMiddleware } from '../utils/async-middleware'

export const scheduleController = Router()

scheduleController.get('/', asyncMiddleware(async (req, res) => {
  const schedules = await prisma.schedule.findMany({ include: { services: true } })
  res.json(schedules)
}))

scheduleController.post('/', asyncMiddleware(async (req, res) => {
  const { services = [], ...data } = req.body
  const schedule = await prisma.schedule.create({
    data: {
      ...data,
      services: { connect: services.map(id => ({ id })) }
    },
    include: { services: true }
  })
  res.json(schedule)
}))

scheduleController.patch('/:id', asyncMiddleware(async (req, res) => {
  const { services, ...data } = req.body
  const schedule = await prisma.schedule.update({
    where: { id: Number(req.params.id) },
    data: {
      ...data,
      // override services only if `services` is definied in req.body
      ...(services ? { services: { set: services.map(id => ({ id })) } } : {})
    },
    include: { services: true }
  })
  res.json(schedule)
}))

scheduleController.delete('/:id', asyncMiddleware(async (req, res) => {
  await prisma.schedule.delete({ where: { id: Number(req.params.id) } })
  res.json({ id: Number(req.params.id) })
}))
