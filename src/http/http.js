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

export function getAll(endpoint, page, size) {

  return axios.get(`${url}/${endpoint}?size=${size}&page=${page}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export function remove(id, endpoint) {
  return axios.delete(`${url}/${endpoint}`, { data: id })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export function update(body, endpoint) {
  return axios.put(`${url}/${endpoint}`, body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}