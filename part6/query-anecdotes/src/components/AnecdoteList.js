import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAnecdotes, updateVote } from '../utils/request';

const AnecdoteList = () => {
  const updateVoteMutation = useMutation(updateVote);
  const queryClient = useQueryClient();
  const { data: anecdotes, isLoading } = useQuery('anecdotes', getAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    }
  });

  const voteHandle = anecdote => {
    updateVoteMutation.mutate(anecdote);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() => {
                    voteHandle(anecdote);
                  }}>
                  vote
                </button>
              </div>
            </div>
          ))
      )}
    </>
  );
};

export default AnecdoteList;
