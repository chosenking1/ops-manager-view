// ApiClient.js
import axios from 'axios';
import apiUrl from '../apiConfig';

class ApiClient {
  constructor({ url, method='get', headers = {}, params = {}, data = {}, onSuccess, onError }) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.params = params;
    this.data = data;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }
  
  async fetchData() {
    axios.defaults.baseURL = apiUrl;
    const token = sessionStorage.getItem('token');
    
    try {
      const response = await axios({
        method: this.method,
        url: this.url,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...this.headers,
        },
        params: this.method.toLowerCase() === 'get' ? this.params : {}, // Use params for GET
        data: this.method.toLowerCase() !== 'get' ? this.data : {}, 
      });

      if (this.onSuccess) {
        console.info('Fetching data')
        this.onSuccess(response.data);
      }
    } catch (error) {
      if (this.onError) {
        this.onError(error);
      }
    }
  }
}

export default ApiClient;
