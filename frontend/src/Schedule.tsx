import React, { useEffect, useState } from 'react';
import cronParser from 'cron-parser'
import './App.css';
import { TSchedule } from './types';

type TProps = {
  schedule: TSchedule
}

const Schedule = ({ schedule }: TProps) =>  {
  const { cron, date, duration, isRepeating, isActive } = schedule
  const [isBlocking, setIsBlocking] = useState(false)
  const [toggle, setToggle] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setIsBlocking(false)
      return
    }

    if (isRepeating && cron) {
      const now = Date.now()
      const cronInterval = cronParser.parseExpression(cron)
      const prev = cronInterval.prev().getTime()
      const next = cronInterval.next().getTime()
      const isCurrent = (prev < now) && ((prev + duration * 1000) > now)
      const toggleIn = isCurrent ? prev + duration * 1000 : next - now
      const timeout = setTimeout(() => setToggle(Math.random()), toggleIn)

      setIsBlocking(isCurrent)

      return () => clearTimeout(timeout)
    }

    if (date) {
      const now = Date.now()
      const dateMs = date * 1000
      const isCurrent = dateMs < now && (dateMs + duration * 1000) > now
      const toggleIn = isCurrent
        ? (dateMs + duration * 1000) - now
        : dateMs > now ? (dateMs - now) : 0

      setIsBlocking(isCurrent)

      if (toggleIn) {
        const timeout = setTimeout(() => setToggle(Math.random()), toggleIn)
        return () => clearTimeout(timeout)
      }
    }
  }, [cron, date, duration, isActive, isRepeating, toggle])

  useEffect(() => {
    // Do whatever is neccessary when `isBlocking` status is changed
  }, [isBlocking])

  return (
    <div>
      <h4>{schedule.name}</h4>
      Blocking: <b><span style={{ color: isBlocking ? 'red' : 'green' }}>{isBlocking.toString()}</span></b><br/>
      {(date && !isRepeating) && <div>At time: {(new Date(date * 1000)).toString()}</div>}
      Services: {schedule.services.map(s => s.name).join(', ')}
    </div>
  )
}

export default Schedule;
