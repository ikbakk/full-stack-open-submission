import { useContext } from 'react';
import NotifContext from '../utils/context';

const useNotification = () => useContext(NotifContext);

export default useNotification;
