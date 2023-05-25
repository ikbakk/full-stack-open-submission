import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    display: 'flex',
    width: '40%',
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
