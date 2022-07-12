import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://192.168.1.12:5001/lighton-e6343/us-central1/api'
});

export default requester;
