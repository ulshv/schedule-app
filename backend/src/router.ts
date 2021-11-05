import { Router } from 'express'
import { scheduleController } from './controllers/schedule.controller'
import { serviceController } from './controllers/service.controller'

export const router = Router()

router.use('/schedules', scheduleController)
router.use('/services', serviceController)
