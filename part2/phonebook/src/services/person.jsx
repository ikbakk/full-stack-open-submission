import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

async function getPersons() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function createPerson(person) {
  const request = axios.post(baseUrl, person);
  return request.then((response) => response.data);
}

function removePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

function updatePerson(id, person) {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
}

export { createPerson, getPersons, removePerson, updatePerson };
