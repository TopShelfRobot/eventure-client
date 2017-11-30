import axios from 'axios'
import tokenManager from './tokenManager'

export const request = axios.create({
  baseURL: process.env.API_BASE,
  timeout: 10000,
  // withCredentials: true,
  // transformRequest: [(data) => JSON.stringify(data.data)],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});


request.interceptors.request.use(
  config => {
    const token = (tokenManager.getAuthToken() || {}).token;

    config.headers['Authorization'] = (token) ? `Bearer ${token}` : null;

    return config;
  },
  error => Promise.reject(error)
);

request.interceptors.response.use(
  goodResponse => goodResponse,
  error => {
    if (error.response && error.response.status === 401) {
      tokenManager.removeAuthToken();
    }

    return Promise.reject(error);
  }
)


export const login = credentials => request.post('/login', credentials)
export const logout = () => request.get('/auth/logout')

export const listEventures = () => request.get('/eventure')
export const createEventure = data => request.post('/eventure', data)

export const createListing = (eventureId, listingData) => request.post(`/eventure/${eventureId}/listing`, listingData)
export const updateFeeSchedule = (eventureId, listingId, fees) => request.put(`/eventure/${eventureId}/listing/${listingId}/feeSchedule`, fees)

export const getPeople = () => request.get('/person')
export const searchPeople = terms => request.get('/person', {params: {terms}})
export const updatePerson = personData => request.put(`/person/${personData.id}`, personData)

export const createRegistration = regData => request.post('/registration', regData)

