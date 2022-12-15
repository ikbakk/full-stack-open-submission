const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
