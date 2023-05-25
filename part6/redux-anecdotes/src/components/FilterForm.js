import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const FilterForm = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    e.preventDefault();
    dispatch(setFilter(e.target.value));
  };

  return (
    <form style={{ marginBottom: '15px' }}>
      <span>filter</span>
      <input
        type='text'
        placeholder='Filter anecdotes'
        onChange={handleChange}
      />
    </form>
  );
};

export default FilterForm;
