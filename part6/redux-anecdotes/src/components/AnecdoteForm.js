import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notifReducer';
import { createNew } from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createHandle = async e => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    const newAnecdote = await createNew(anecdote);
    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`you added ${newAnecdote.content}`));
    setTimeout(() => dispatch(clearNotification()), 5000);
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
