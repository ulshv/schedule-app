import { Router } from 'express'
import { scheduleController } from './controllers/schedule.controller'
import { serviceController } from './controllers/service.controller'
import { adminWriteMiddleware } from './utils/admin-middleware'

export const router = Router()

router.use('/schedules', scheduleController)
router.use('/services', adminWriteMiddleware, serviceController)
