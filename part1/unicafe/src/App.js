import { useState } from 'react'

function Headline({headingTitle}) {

  return (
  <div>
    <h1>{headingTitle}</h1>
  </div>
  )
}

function Button({action, name}) {

  const buttonStyle = {
    display: "inline-block"
  };

  return (
  <div style={buttonStyle}>
    <button onClick={action}>{name}</button>
  </div>
  )
}

function StatisticLine({name, value}) {
  let td;

  if(name == "positive") {
    td = <td>{value}%</td>
  } else {
    td = <td>{value}</td>
  }

  return(
    <tr>
      <td>{name}</td>
      {td}
    </tr>
  )
}

function Statistics({statistics}) {
  if(statistics.good || statistics.bad || statistics.neutral) {
    return (
      <table>
        <tbody>
        <StatisticLine name="good" value={statistics.good} />
        <StatisticLine name="neutral" value={statistics.neutral} />
        <StatisticLine name="bad" value={statistics.bad} />
        <StatisticLine name="all" value={statistics.all} />
        <StatisticLine name="average" value={statistics.average.toFixed(1)} />
        <StatisticLine name="positive" value={statistics.positive.toFixed(1)} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div> 
        <p>No feedback given</p>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  let total = good + neutral + bad;
  let average = (good * 1 + neutral * 0 + bad * (-1)) / total;
  let positive = (good/total) * 100;

  const statistics = {good, neutral, bad, all:total, average, positive};

  const handleGoodclicks = () => setGood(good + 1);
  const handleNeutralClicks = () => setNeutral(neutral + 1);
  const handleBadClicks = () => setBad(bad + 1);

  return (
    <div>
      <Headline headingTitle = "give feedback"></Headline> 

      <Button action={handleGoodclicks} name="good"></Button>
      <Button action={handleNeutralClicks} name="neutral"></Button>
      <Button action={handleBadClicks} name="bad"></Button>

      <Headline headingTitle = "statistics"></Headline> 
      <Statistics statistics = {statistics}></Statistics>
    </div>
  )
}

export default App