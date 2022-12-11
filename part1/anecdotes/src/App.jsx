import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good +1)
  const addBad = () => setBad(bad +1)
  const addNeutral = () => setNeutral(neutral +1)

  const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
  }

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Table = ({ good, bad, neutral }) => {
    const all = good + bad + neutral

    if (all === 0) {
      return (
        <div>
          <h1>Statistics</h1>
          <p>No feedback given</p>
        </div>
      )
    }

    const positive = ((good / all) * 100).toFixed(1)
    const average = ((good - bad) / all).toFixed(1)

    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'positive'} value={positive} />
            <StatisticLine text={'average'} value={average} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='good' onClick={addGood} />
      <Button text='neutral' onClick={addNeutral} />
      <Button text='bad' onClick={addBad} />
      <Table good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
