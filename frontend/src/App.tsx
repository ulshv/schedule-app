import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { TSchedule } from './types';
import Schedule from './Schedule';

function App() {
  const [schedules, setSchedules] = useState<TSchedule[]>([])
  const [clientUuid, setClientUuid] = useState('')
  const [isStarted, setIsStarted] = useState(false)

  const fetchSchedules = async () => {
    const { data } = await axios.get<TSchedule[]>(
      'http://localhost:3000/api/v1/schedules',
      { headers: { 'x-client-uuid': clientUuid } }
    )
    setSchedules(data)
  }

  const handleStart = () => {
    setIsStarted(true)
    fetchSchedules()
    setInterval(fetchSchedules, 5000)
  }

  return (
    <div className="App">
      <h2>Schedules App</h2>
      <input
        type="text"
        placeholder="Client's UUIDv4"
        style={{ width: 300 }}
        value={clientUuid}
        onChange={e => setClientUuid(e.target.value)}
        disabled={isStarted}
      />
      {!isStarted && <button onClick={handleStart}>start</button>}

      <div>
        {schedules.map(schedule => <Schedule key={schedule.id} schedule={schedule} />)}
      </div>
    </div>
  );
}

export default App;
