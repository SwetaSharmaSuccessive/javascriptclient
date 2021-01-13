/* eslint-disable consistent-return */
/* eslint-disable no-console */
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
    console.log('api console', response);
    // localStorage.setItem('token', response.data.data.generated_token);
    // const token = localStorage.getItem('token');
    // console.log('Token:::::', token);
    return response;
  } catch (error) {
    console.log('Inside catch', error);
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
