import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return (state = action.payload);
    },
    clearNotification(state) {
      return initialState;
    }
  }
});

export const notification = createAsyncThunk(
  'notification',
  async ({ message, timer }, { dispatch }) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(clearNotification()), timer * 1000);
  }
);

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
