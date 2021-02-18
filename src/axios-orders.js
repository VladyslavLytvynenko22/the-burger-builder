import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://the-burger-builder-d8d91-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
