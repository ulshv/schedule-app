import express from 'express';
import bodyParser from 'body-parser'
import { router } from './router';

export const app = express()

app.use(bodyParser.json())
app.use('/api/v1', router)
