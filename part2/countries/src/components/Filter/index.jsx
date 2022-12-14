function Filter({ value, onChange }) {
  return (
    <>
      <label htmlFor="filter">Find countries </label>
      <input value={value} onChange={onChange} />
    </>
  );
}

export default Filter;
