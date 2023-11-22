import axios from 'axios';
import { BlogInput } from '../interfaces/blogs';
const baseUrl = 'http://localhost:5000/api/blogs';

export const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = async (newBlog: BlogInput, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export const update = async (id: string, newBlog: BlogInput, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return response.data;
};

export const remove = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
