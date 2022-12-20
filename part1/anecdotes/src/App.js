import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])

  const handleClickNextAnecdote = () =>{
    let randomNumber = Math.floor(Math.random() * 7);
    setSelected(randomNumber);
  }

  const handleClickVoteAnecdote = () =>{
    const copy = [...points]
    copy[selected] += 1  
    setPoints(copy);
  }

  const getAnecdoteWithMostVotes = () => {
    let max = 0;
    let pos = 0;

    for(let i =0; i < points.length; i++) {
      if(points[i] > max) {
        max = points[i];
        pos = i;
      }
    }
    return anecdotes[pos];
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} of votes</div>
      <button onClick={handleClickNextAnecdote}>next anecdote</button>
      <button onClick={handleClickVoteAnecdote}>vote</button>
      <h1>Anecode with most votes</h1>
      <div>{getAnecdoteWithMostVotes()}</div>
    </div>
  )
}

export default App