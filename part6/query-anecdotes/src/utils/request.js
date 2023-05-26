import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

export const getAnecdotes = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const createNewAnecdote = async content => {
  try {
    const res = await axios.post(baseUrl, {
      content,
      votes: 0,
      id: getId()
    });
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const updateVote = async anecdote => {
  try {
    const { id, votes } = anecdote;
    const res = await axios.put(`${baseUrl}/${id}`, {
      ...anecdote,
      votes: votes + 1
    });
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};
