import React, { useEffect, useState } from 'react';
import cronParser from 'cron-parser'
import './App.css';
import { TSchedule } from './types';

type TProps = {
  schedule: TSchedule
}

const Schedule = ({ schedule }: TProps) =>  {
  const { isActive, cron, duration } = schedule
  const [isBlocking, setIsBlocking] = useState(false)
  const [toggle, setToggle] = useState(0)

  useEffect(() => {
    const now = Date.now()
    const cronInterval = cronParser.parseExpression(cron)
    const prev = cronInterval.prev().getTime()
    const next = cronInterval.next().getTime()
    const isCurrent = (prev < now) && ((prev + duration * 1000) > now)
    const toggleIn = isCurrent ? prev + duration * 1000 : next - now
    const timeout = setTimeout(() => setToggle(Math.random()), toggleIn)

    setIsBlocking(isCurrent)

    // console.log(`
    //   name: ${schedule.name}
    //   now: ${now}
    //   prev: ${prev}
    //   prev < now: ${prev < now}
    //   prev + duration * 1000: ${prev + duration * 1000}
    //   (prev + duration * 1000) > now: ${(prev + duration * 1000) > now}
    //   prev: ${new Date(prev)}
    //   next: ${new Date(next)}
    //   now: ${new Date(now)}
    // `);

    return () => {
      clearTimeout(timeout)
    }
  }, [isActive, cron, duration, toggle])

  useEffect(() => {
    // Do whatever is neccessary when `isBlocking` status is changed
  }, [isBlocking])

  return (
    <div>
      <h4>{schedule.name}</h4>
      Blocking: <b><span style={{ color: isBlocking ? 'red' : 'green' }}>{isBlocking.toString()}</span></b><br/>
      Services: {schedule.services.map(s => s.name).join(', ')}
    </div>
  )
}

export default Schedule;
