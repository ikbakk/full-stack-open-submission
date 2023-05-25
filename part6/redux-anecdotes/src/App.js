import { useSelector, useDispatch } from 'react-redux';
import { addAnecdote, addVote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const voteHandle = id => {
    dispatch(addVote(id));
  };

  const createHandle = e => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(addAnecdote(newAnecdote));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandle(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={createHandle}>
        <div>
          <input type='text' name='anecdote' placeholder='New anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
