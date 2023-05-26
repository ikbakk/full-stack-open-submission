import useNotification from '../hooks/useNotification';

const Notification = () => {
  const { notification } = useNotification();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (!notification) {
    return null;
  }

  return <div>{notification}</div>;
};

export default Notification;
