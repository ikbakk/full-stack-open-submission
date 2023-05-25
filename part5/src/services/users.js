import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/blogs`;

const getUser = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getUser };
