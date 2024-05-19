import axios, { AxiosInstance } from 'axios';
import { redirect } from 'react-router-dom';
const API_ENDPOINT = 'https://app.shuhna.co/api/v1';

class AxiosAPI {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINT,
    });

    this.axiosInstance.interceptors.request.use(
      async (request) => {
        //localStorage
        //const token = getCookies('token');
        //const language = getCookies('language') ?? 'en';

        //request.headers['Authorization'] = token;
        //request.headers['Accept-Language'] = language;
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
          //deleteCookies('token');
          //deleteCookies('user');

          redirect('/auth/login');
        }

        return Promise.reject(error);
      }
    );
  }

  log(error: any) {
    const errorToIgnore = ['Network Error', 'Request aborted'];
    if (errorToIgnore.includes(error?.message)) {
      return;
    }

    const fullBody = {
      page: window.location.pathname,
      error,
    };

    if (error?.stack) {
      delete fullBody.error?.stack;
    }

    return axios.post('/api/log', fullBody);
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

  // Analytic
  analytic() {
    return this.axiosInstance.get<AnalyticResponse>('/analytics/home');
  }

  // Zone
  zoneList() {
    return this.axiosInstance.get<ZoneResponse>('/locations/zones');
  }

  // Business Locations
  businessLocations() {
    return this.axiosInstance.get<BusinessLocationResponse>(
      'locations/business'
    );
  }

  updateBusinessesMainLocation(id: number, isMainLocation: boolean) {
    return this.axiosInstance.put(`locations/business/${id}`, {
      isMainLocation,
    });
  }

  deleteBusinesses(id: number) {
    return this.axiosInstance.delete(`locations/business/${id}`);
  }

  getBusinessesById(id: string) {
    return this.axiosInstance.get<BusinessByIdResponse>(
      `locations/business/${id}`
    );
  }

  getDeliveryById(id: string) {
    return this.axiosInstance.get<DeliveryByIdResponse>(`deliveries/${id}`);
  }

  getDeliveryLogs(id: string) {
    return this.axiosInstance.get<DeliveryLogResponse>(`deliveries/logs/${id}`);
  }

  deleteDelivery(id: number) {
    return this.axiosInstance.delete(`deliveries/${id}`);
  }

  exportDeliveriesPdf(ids: number[]) {
    return this.axiosInstance.post<string>(
      `/deliveries/export/pdf`,
      {
        ids,
      },
      {
        responseType: 'blob',
      }
    );
  }

  // Pickups
  getPickupById(id: string) {
    return this.axiosInstance.get<PickupByIdResponse>(`pickups/${id}`);
  }

  // Public
  trackOrder(trackingNumber: string) {
    return this.axiosInstance.get<TrackOrderResponse>(
      `tracking/${trackingNumber}`
    );
  }

  forgetPasswordMail(email: string) {
    return this.axiosInstance.post(`/users/forgot-password`, { email });
  }
}

const API = new AxiosAPI();

export default API;
