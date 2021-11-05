import { Router } from 'express'
import { prisma } from '../prisma'
import { asyncMiddleware } from '../utils/async-middleware'

export const serviceController = Router()

serviceController.get('/', asyncMiddleware(async (req, res) => {
  const services = await prisma.service.findMany()
  res.json(services)
}))

serviceController.post('/', asyncMiddleware(async (req, res) => {
  const service = await prisma.service.create({ data: req.body })
  res.json(service)
}))

serviceController.patch('/:id', asyncMiddleware(async (req, res) => {
  const service = await prisma.service.update({ where: { id: Number(req.params.id) }, data: req.body })
  res.json(service)
}))

serviceController.delete('/:id', asyncMiddleware(async (req, res) => {
  await prisma.service.delete({ where: { id: Number(req.params.id) } })
  res.json({ id: Number(req.params.id) })
}))
