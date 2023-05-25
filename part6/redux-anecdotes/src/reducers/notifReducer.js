import { createSlice } from '@reduxjs/toolkit';

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

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
