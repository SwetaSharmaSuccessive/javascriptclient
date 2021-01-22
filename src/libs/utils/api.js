import axios from 'axios';

const callApi = async (data, method, url) => {
  try {
    const baseUrl = 'http://localhost:9000/api';
    const response = await axios({

      method,
      url: baseUrl + url,
      data,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return response;
  } catch (error) {
    return { status: 'error', message: 'This is an Error Message' };
  }
};
export default callApi;
