class ErrorResponse extends Error {
    status: number;
    errorCode: number;
    errors?: any;
    data?: any;
  
    constructor(message: string, status: number, errorCode: number, errors?: any, data?: any) {
      super(message);
      this.status = status;
      this.errorCode = errorCode;
      this.errors = errors;
      this.data = data;
  
      // Maintaining proper prototype chain for `Error`
      Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
  }
  
  export default ErrorResponse;
  