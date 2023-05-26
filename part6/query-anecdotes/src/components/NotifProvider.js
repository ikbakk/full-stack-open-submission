import { useReducer } from 'react';
import NotifContext from '../utils/context';

const initialState = null;

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload;
    case 'HIDE':
      return null;
    default:
      return state;
  }
};

const NotifProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notifReducer, initialState);

  const showNotif = message => {
    dispatch({ type: 'SHOW', payload: message });
    setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, 5000);
  };

  const value = {
    notification: state,
    showNotif
  };
  return (
    <NotifContext.Provider value={value}>{children}</NotifContext.Provider>
  );
};

export default NotifProvider;
