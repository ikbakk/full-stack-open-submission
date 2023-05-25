import { useSelector, useDispatch } from 'react-redux';
import { voteUpdate } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const voteHandle = anecdote => {
    dispatch(voteUpdate(anecdote));
  };

  const sortedAnecdotes = anecdotes
    .filter(anecdote => anecdote.content.includes(filter))
    .slice()
    .sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandle(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
