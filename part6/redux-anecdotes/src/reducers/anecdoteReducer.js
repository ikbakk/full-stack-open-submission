import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setNotification,
  clearNotification,
  notification
} from './notifReducer';

const initialState = [];

const setId = () => {
  return Math.round(Math.random() * 10000).toFixed(0);
};

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      );
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initialize',
  async (_, { dispatch }) => {
    const response = await axios.get('http://localhost:3001/anecdotes');

    dispatch(setAnecdotes(response.data));
  }
);

export const createAnecdote = createAsyncThunk(
  'anecdotes/add',
  async (anecdote, { dispatch }) => {
    const response = await axios.post('http://localhost:3001/anecdotes', {
      content: anecdote,
      votes: 0,
      id: setId()
    });

    const notif = { message: `New anecdote:  ${anecdote}`, timer: 3 };

    dispatch(addAnecdote(response.data));
    dispatch(notification(notif));
  }
);

export const voteUpdate = createAsyncThunk(
  'anecdotes/vote',
  async (anecdote, { dispatch }) => {
    const { id, votes } = anecdote;
    const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, {
      ...anecdote,
      votes: votes + 1
    });

    const notif = { message: `Voted for ${anecdote.content}`, timer: 3 };

    dispatch(addVote(response.data));
    dispatch(notification(notif));
  }
);

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
