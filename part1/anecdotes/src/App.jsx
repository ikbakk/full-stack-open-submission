import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdotes = () => {
    if (anecdotes.length < 2) return

    const next = () => Math.floor(Math.random() * anecdotes.length)

    let index = next()
    while (index === selected) {
      index = next()
    }
    setSelected(index)
  }

  const Anecdote = ({ text, votes}) => {
    return (
      <div>
        <div>{text}</div>
        <div>has {votes} vote{(votes ===1) ? '' : 's'}</div>
      </div>
    )
  }

  const maxIndex = (array) => {
    if (array.length === 0) return -1

    let maxIndex = 0
    array.forEach((v, i) => {
      if (v > array[maxIndex]) {
      maxIndex = i
      }
    })
    return maxIndex
  }

  const vote = (index) => {
    setVotes(votes => {
      const a = [...votes]
      a[index] += 1
      return a
    })
  }

  console.log(maxIndex([1,2,3,4,0]))
  const selectedAnecdotes = anecdotes[selected]
  const selectedVote = votes[selected]

  const mostVotedIndex = maxIndex(votes)
  const mostVoted = anecdotes[mostVotedIndex]
  const mostVotedVotes = votes[mostVotedIndex]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={selectedAnecdotes} votes={selectedVote} />
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={nextAnecdotes}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote text={mostVoted} votes={mostVotedVotes}/>
      <button onClick={() => vote(mostVotedIndex)}>vote</button>
    </div>
  )
}

export default App
