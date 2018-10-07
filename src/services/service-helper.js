import axios from 'axios';

/**
 * Set the request configs
 * 
 * @param {string} url - API Request url
 * @param {string} method - Kind of method
 * @param {Object} payload - Request payload
 * @param {string} token - Auth token
 * @returns {requestCallback}
 */
const doRequest = (url, method, payload, token) => {
  const request = {
    method,
    url,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.cloak-preview'
    },
  };

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return axios(request);
};

class ServiceHelper {
  /**
   * Get request helper
   * 
   * @param {string} url
   * @param {string} token
   * @returns {requestCallback}
   */
  static SendGet(url, token) {
    return doRequest(url, 'get', null, token);
  }

  /**
   * Post request helper
   * 
   * @param {string} url
   * @param {Object} payload
   * @param {string} token
   * @returns {requestCallback}
   */
  static SendPost(url, payload, token) {
    return doRequest(url, 'post', payload, token);
  }

  /**
   * Put request helper
   * 
   * @param {string} url
   * @param {Object} payload
   * @param {string} token
   * @returns {requestCallback}
   */
  static SendPut(url, payload, token) {
    return doRequest(url, 'put', payload, token);
  }
}

export default ServiceHelper;
