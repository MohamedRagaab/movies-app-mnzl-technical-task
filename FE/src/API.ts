import axios, { AxiosInstance } from 'axios';
import { redirect } from 'react-router-dom';
const API_ENDPOINT = 'https://movies-app-mnzl-technical-task-1.onrender.com/api/v1';

class AxiosAPI {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINT,
    });

    this.axiosInstance.interceptors.request.use(
      async (request) => {
        const token = localStorage.getItem('token');

        request.headers['Authorization'] = token;
        request.headers['Content-Type'] = 'application/json';

        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        if (error?.response?.status === 401) {
          localStorage.removeItem('token');

          redirect('/auth/login');
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth
  login(body = {}) {
    return this.axiosInstance.post<LoginResponse>('users/login', body);
  }

  register(body = {}) {
    return this.axiosInstance.post<RegisterResponse>('users', body);
  }

  // User
  getUserInfo() {
    return this.axiosInstance.get<GetUserResponse>('users');
  }

}

const API = new AxiosAPI();

export default API;
