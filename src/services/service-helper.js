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
}

export default ServiceHelper;
