import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { TSchedule } from './types';
import Schedule from './Schedule';

function App() {
  const [schedules, setSchedules] = useState<TSchedule[]>([])

  const fetchSchedules = async () => {
    const { data } = await axios.get<TSchedule[]>('http://localhost:3000/api/v1/schedules')
    setSchedules(data)
  }

  useEffect(() => {
    fetchSchedules()
    setInterval(fetchSchedules, 5000)
  }, [])

  return (
    <div className="App">
      <h2>Schedules App</h2>

      <div>
        {schedules.map(schedule => <Schedule key={schedule.id} schedule={schedule} />)}
      </div>
    </div>
  );
}

export default App;
