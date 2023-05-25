import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      const anecdoteToChange = state.find(n => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(n => (n.id !== id ? n : changedAnecdote));
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
