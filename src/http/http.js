import { headers, url } from './config'
import axios from 'axios';

export function create(request, endpoint) {

  return axios.post(`${url}/${endpoint}`, request)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export function getAll(endpoint) {

  return axios.get(`${url}/${endpoint}`)
    .then(function (response) {
       return response.data;
    })
    .catch(function (error) {
      return error;
    });
}