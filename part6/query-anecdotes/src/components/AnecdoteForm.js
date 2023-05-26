import { useMutation, useQueryClient } from 'react-query';
import { createNewAnecdote } from '../utils/request';
import useNotification from '../hooks/useNotification';

const AnecdoteForm = () => {
  const { showNotif } = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createNewAnecdote, {
    // onSuccess: newAnecdoteMutation => {
    //   const anecdote = queryClient.getQueryData('anecdotes');
    //   queryClient.setQueryData('anecdotes', [
    //     ...anecdote,
    //     newAnecdoteMutation.data
    //   ]);
    // }
  });

  const onCreate = event => {
    event.preventDefault();
    if (event.target.anecdote.value.length < 5) {
      showNotif('Anecdote must be at least 5 characters long');
    } else {
      const content = event.target.anecdote.value;
      newAnecdoteMutation.mutate(content);
      showNotif('Anecdote created!');
      event.target.anecdote.value = '';
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
