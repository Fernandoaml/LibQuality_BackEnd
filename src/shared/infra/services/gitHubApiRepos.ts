import axios from 'axios';
import 'dotenv';

const api = axios.create({
  baseURL: 'https://api.github.com/',
});
// headers: { Authorization: `Token ${process.env.KEY_TO_GITHUBAPI}` },
export default api;
