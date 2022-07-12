import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://localhost:5001/lighton-e6343/us-central1/api'
});

export default requester;
