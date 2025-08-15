import { useState } from 'react';
import '../App.css';

function Home() {
  const [periodDate, setPeriodDate] = useState('');
  const [periodHistory, setPeriodHistory] = useState([]);
  const [nextPeriodDate, setNextPeriodDate] = useState('');
  const [ovulationDate, setOvulationDate] = useState('');
  const [ovulationWindow, setOvulationWindow] = useState('');
  const [symptom, setSymptom] = useState('');
  const [symptomLogs, setSymptomLogs] = useState([]);


  const handleAddPeriodDate = () => {
    if (!periodDate) return;
    if (periodHistory.includes(periodDate)) {
      alert("This date is already added.");
      return;
    }

    setPeriodHistory(prev => [...prev, periodDate].sort());
    setPeriodDate('');
  };

  
  const getAverageCycleLength = () => {
    if (periodHistory.length < 2) return 28;

    const dates = periodHistory.map(date => new Date(date)).sort((a, b) => a - b);
    const intervals = [];

    for (let i = 1; i < dates.length; i++) {
      const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
      intervals.push(diff);
    }

    const avg = Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length);
    return avg;
  };

  
  const handleCalculate = () => {
    if (periodHistory.length < 2) {
      alert("Please add at least two period start dates.");
      return;
    }

    const averageCycleLength = getAverageCycleLength();
    const sortedHistory = periodHistory.map(date => new Date(date)).sort((a, b) => a - b);
    const lastStart = sortedHistory[sortedHistory.length - 1];

    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(nextPeriod.getDate() + averageCycleLength);
    setNextPeriodDate(nextPeriod.toISOString().split('T')[0]);

    const ovulation = new Date(lastStart);
    ovulation.setDate(ovulation.getDate() + (averageCycleLength - 14));
    const formattedOvulation = ovulation.toISOString().split('T')[0];
    setOvulationDate(formattedOvulation);

    const windowStart = new Date(ovulation);
    windowStart.setDate(windowStart.getDate() - 5);
    const formattedWindowStart = windowStart.toISOString().split('T')[0];
    setOvulationWindow(`${formattedWindowStart} to ${formattedOvulation}`);
  };

  
  const handleAddSymptom = () => {
    if (!symptom.trim()) {
      alert("Please enter a symptom.");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    setSymptomLogs(prev => [...prev, { date: today, symptom }]);
    setSymptom('');
  };

  return (
    <div className="container">
      <h1>Cycle & Ovulation Tracker</h1>

      
      <label>Enter a past period start date:</label>
      <input
        type="date"
        value={periodDate}
        onChange={(e) => setPeriodDate(e.target.value)}
      />
      <button onClick={handleAddPeriodDate}>Add Period Date</button>

      
      {periodHistory.length > 0 && (
        <div>
          <p><strong>Cycle History:</strong></p>
          <ul>
            {periodHistory.map((date, idx) => (
              <li key={idx}>{date}</li>
            ))}
          </ul>
        </div>
      )}

      <br />
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

      <hr style={{ margin: '30px 0' }} />

    
      <h2>Symptom Tracker</h2>
      <label>Log a Symptom:</label>
      <input
        type="text"
        placeholder="e.g. cramps, fatigue"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
      />
      <button onClick={handleAddSymptom}>Add Symptom</button>

      
      {symptomLogs.length > 0 && (
        <div>
          <h3>Logged Symptoms</h3>
          <ul>
            {symptomLogs.map((entry, idx) => (
              <li key={idx}>{entry.date}: {entry.symptom} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
