// Axios
interface AxiosResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  code: number;
}

// TODO: find a wat to make it global
// add type to axios itself
interface ResponseError {
  message: string;
}

type AxiosError = {
  errorCode: number;
  message: string;
  success: boolean;
};

type LoginResponse = AxiosResponse<{
  token: string;
  user: User;
  business: BusinessAccount;
}>;

type RegisterResponse = AxiosResponse<{
  user: User;
  token: string;
  business: BusinessAccount;
}>;

type DeliveriesResponse = AxiosResponse<{
  deliveries: Delivery[];
  total: number;
}>;

type DeliveryByIdResponse = AxiosResponse<Delivery>;

type DeliveryLogResponse = AxiosResponse<DeliveryLog[]>;

type ZoneResponse = AxiosResponse<Government[]>;

type PickupResponse = AxiosResponse<{
  pickups: Pickup[];
  total: number;
}>;

type DeliveryUploadedBulk = AxiosResponse<{
  createdDeliveries: {
    row: number;
    success: boolean;
    trackingNumber: string;
  }[];
  totalFailedDeliveries: number;
}>;

type PickupByIdResponse = AxiosResponse<Pickup>;

type PickupCreationResponse = AxiosResponse<Pickup>;

type PickupUpdateResponse = AxiosResponse<number[]>;

type PickupDeletionResponse = AxiosResponse<number>;

type DeleteDeliveriesResponse = AxiosResponse<number>;

type BusinessesResponse = AxiosResponse<BusinessLocation[]>;

type BusinessByIdResponse = AxiosResponse<BusinessLocation>;

type GetUserResponse = AxiosResponse<User>;

type TrackOrderResponse = AxiosResponse<TrackOrder>;

type BusinessLocationResponse = AxiosResponse<BusinessLocation[]>;

type AnalyticResponse = AxiosResponse<AnalyticStatus>;
