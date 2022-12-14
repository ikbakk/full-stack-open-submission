import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonTable from "./components/PersonTable";
import FlashMessage from "./components/FlashMessage";
import {
  createPerson,
  getPersons,
  removePerson,
  updatePerson,
} from "./services/person";

import "./index.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    getPersons()
      .then((persons) => setPersons(persons))
      .catch((err) => console.error(err));
  }, []);

  function showTimedFlashMessage(message) {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(null), 4000);
  }

  function showTimedErrorMessage(message) {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 4000);
  }

  function handleCreate(name, number) {
    createPerson({ name, number }).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
      showTimedFlashMessage(`Added ${createdPerson.name}`);
    });
  }

  function handleDelete(id) {
    const person = persons.find((person) => person.id === id);
    if (!person) return;
    if (!confirm(`Delete ${person.name}?`)) return;

    removePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showTimedErrorMessage(
          `Information of ${person.name} has already been removed from server`
        );
      });
  }

  function handleUpdate(person, newNumber) {
    const id = person.id;
    updatePerson(id, { ...person, number: newNumber })
      .then((updatedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? updatedPerson : p)));
        setNewName("");
        setNewNumber("");
      })
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showTimedErrorMessage(
          `Information of ${person.name} has already been removed from server`
        );
      });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (newName === "") {
      alert("name can't be empty");
      return;
    }

    if (newNumber === "") {
      alert("number can't be empty");
      return;
    }

    const person = persons.find(
      (p) =>
        p.name.localeCompare(newName, undefined, { sensitivity: "base" }) === 0
    );
    if (person) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        handleUpdate(person, newNumber);
      }
      return;
    }

    handleCreate(newName, newNumber);
  }

  const onFilterChange = (e) => setFilter(e.target.value);
  const onNameChange = (e) => setNewName(e.target.value);
  const onNumberChange = (e) => setNewNumber(e.target.value);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toUpperCase().includes(filter.toUpperCase())
        );

  return (
    <>
      <h1>Phonebook</h1>
      <FlashMessage message={errorMessage} type="error" />
      <FlashMessage message={flashMessage} type="success" />
      <Filter value={filter} onChange={onFilterChange} />

      <h2>Add new</h2>
      <PersonForm
        name={newName}
        onNameChange={onNameChange}
        number={newNumber}
        onNumberChange={onNumberChange}
        onSubmit={onSubmit}
      />

      <h2>Numbers</h2>
      <PersonTable persons={personsToShow} onDelete={handleDelete} />
    </>
  );
}

export default App;
