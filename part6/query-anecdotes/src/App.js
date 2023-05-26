import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import NotifProvider from './components/NotifProvider';

const App = () => {
  return (
    <NotifProvider>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </NotifProvider>
  );
};

export default App;
