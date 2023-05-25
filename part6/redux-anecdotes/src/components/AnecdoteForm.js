import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createHandle = e => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(addAnecdote(newAnecdote));
    e.target.anecdote.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createHandle}>
        <div>
          <input type='text' name='anecdote' placeholder='New anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
