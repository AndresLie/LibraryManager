import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
class LibraryApi {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 15000,
    });
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Sending request to ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Response error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error) {
      console.error(`Error in request to ${config.url}:`, error);
      throw error;
    }
  }

  async getBooks() {
    try {
      const response = await this.request<any>({
        url: "/api/books",
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (err) {
      console.error("Error uploading file:", err);
      throw err;
    }
  }

  async getBookBy(id: String) {
    try {
      const response = await this.request<any>({
        url: `/api/book/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
const libraryApi = new LibraryApi();
export default libraryApi;
