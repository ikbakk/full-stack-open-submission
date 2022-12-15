const PersonForm = ({
  name,
  onNameChange,
  number,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">name:</label>
      <input id="name" value={name} onChange={onNameChange} />
      <br />

      <label htmlFor="number">number:</label>
      <input id="number" value={number} onChange={onNumberChange} />
      <br />

      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
