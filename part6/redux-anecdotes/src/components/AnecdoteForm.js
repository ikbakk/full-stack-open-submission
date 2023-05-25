import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notification } from '../reducers/notifReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createHandle = e => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    const message = `Anecdote added: ${anecdote}`;
    const timer = 3;

    dispatch(createAnecdote(anecdote));
    dispatch(notification({ message, timer }));
    console.log(dispatch(notification({ message, timer })));

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
