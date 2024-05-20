interface AxiosResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  code: number;
}
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
}>;

type RegisterResponse = AxiosResponse<{
  id: string;
  name: string;
  email: string;
}>;

type ListFavorites = AxiosResponse<Favorite>;
