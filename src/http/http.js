import { headers, url, loginUrl } from './config'
import {setUserToken, setUserInfo} from '../utils/user-info';
import axios from 'axios';

class HttpHandler {

  create(request, endpoint) {

    let newUrl = endpoint === 'login' ? loginUrl : url;

    return axios.post(`${newUrl}/${endpoint}`, request)
      .then((response) => {

        if (response.status === 200 && newUrl) {
          setUserToken(response.headers.authorization);
          setUserInfo(response.data);
          window.location.assign("menu")
        }

        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  getAll(endpoint, page, size) {

    return axios.get(`${url}/${endpoint}?size=${size}&page=${page}`, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  getInfo(endpoint) {

    return axios.get(`${loginUrl}/${endpoint}`, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  remove(id, endpoint) {
    return axios.delete(`${url}/${endpoint}/${id}`, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  update(body, endpoint) {
    return axios.put(`${url}/${endpoint}`, body, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

}

export default HttpHandler;