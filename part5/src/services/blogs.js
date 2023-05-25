import axios from 'axios';
import jwtDecode from 'jwt-decode';
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/blogs`;

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;

  return token;
};

const getUserId = () => {
  return token ? jwtDecode(token).id : null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async id => {
  const config = { headers: { Authorization: token } };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, setToken, remove, getUserId };
