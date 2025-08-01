import { useState } from 'react';
import '../App.css';

function Home() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [nextPeriodDate, setNextPeriodDate] = useState('');
  const [ovulationDate, setOvulationDate] = useState('');
  const [ovulationWindow, setOvulationWindow] = useState('');

  const handleCalculate = () => {
    if (!lastPeriodDate) return;

    const startDate = new Date(lastPeriodDate);

    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(nextPeriod.getDate() + 28);
    const formattedNextPeriod = nextPeriod.toISOString().split('T')[0];
    setNextPeriodDate(formattedNextPeriod);

    const ovulation = new Date(startDate);
    ovulation.setDate(ovulation.getDate() + 14);
    const formattedOvulation = ovulation.toISOString().split('T')[0];
    setOvulationDate(formattedOvulation);

    const windowStart = new Date(ovulation);
    windowStart.setDate(windowStart.getDate() - 5);
    const formattedWindowStart = windowStart.toISOString().split('T')[0];
    setOvulationWindow(`${formattedWindowStart} to ${formattedOvulation}`);
  };

  return (
    <div className="container">
      <h1>Ovulation Tracker</h1>
      <label>Enter your last period date:</label>
      <input
        type="date"
        value={lastPeriodDate}
        onChange={(e) => setLastPeriodDate(e.target.value)}
      />
      <button onClick={handleCalculate}>Predict</button>

      {nextPeriodDate && (
        <p>Your next period is likely to start on: <strong>{nextPeriodDate}</strong></p>
      )}
      {ovulationDate && (
        <p>Estimated Ovulation Date: <strong>{ovulationDate}</strong></p>
      )}
      {ovulationWindow && (
        <p>Ovulation Window: <strong>{ovulationWindow}</strong></p>
      )}
    </div>
  );
}

export default Home;
