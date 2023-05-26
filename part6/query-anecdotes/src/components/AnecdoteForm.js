import { useMutation, useQueryClient } from 'react-query';
import { createNewAnecdote } from '../utils/request';

const AnecdoteForm = () => {
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
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = '';
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
