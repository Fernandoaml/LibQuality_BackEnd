import axios from 'axios';
import 'dotenv';

const api = axios.create({
  baseURL: `${process.env.USER_AND_KEY_API}https://api.github.com/`,
});
export default api;
