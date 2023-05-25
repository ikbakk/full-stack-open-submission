import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterForm from './components/FilterForm';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { getAll } from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
