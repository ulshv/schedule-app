import { Router } from 'express'
import { prisma } from '../prisma'
import { asyncMiddleware } from '../utils/async-middleware'

export const scheduleController = Router()

scheduleController.get('/', asyncMiddleware(async (req, res) => {
  const schedules = await prisma.schedule.findMany({
    where: { clientUuid: req.headers['x-client-uuid'] || '' },
    include: { services: true }
  })
  res.json(schedules)
}))

scheduleController.post('/', asyncMiddleware(async (req, res) => {
  const { services = [], ...data } = req.body
  const clientUuid = req.headers['x-client-uuid']

  if (!clientUuid) return res.status(400).json({ error: `'x-client-uuid' header is not provided.`})

  const schedule = await prisma.schedule.create({
    data: {
      ...data,
      clientUuid,
      services: { connect: services.map(id => ({ id })) }
    },
    include: { services: true }
  })
  res.json(schedule)
}))

scheduleController.patch('/:id', asyncMiddleware(async (req, res) => {
  const { services, ...data } = req.body
  const exists = await prisma.schedule.findFirst({
    where: {
      id: Number(req.params.id),
      clientUuid: req.headers['x-client-uuid'] || ''
    }
  })

  if (!exists) return res.status(404).json({ error: 'Not found' })

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
  const exists = await prisma.schedule.findFirst({
    where: {
      id: Number(req.params.id),
      clientUuid: req.headers['x-client-uuid'] || ''
    }
  })

  if (!exists) return res.status(404).json({ error: 'Not found' })

  await prisma.schedule.delete({ where: { id: Number(req.params.id) } })
  res.json({ id: Number(req.params.id) })
}))
