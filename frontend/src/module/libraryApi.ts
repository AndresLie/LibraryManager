import { Book } from "@/types/book";
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
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err) {
      console.error("Error Fetching all books", err);
      throw err;
    }
  }

  async getBookById(id: String) {
    try {
      const response = await this.request<any>({
        url: `/api/book/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error(`Error Fetching  book with ID ${id}:`, error);
      throw error;
    }
  }

  async addBook(book: Book) {
    try {
      const response = await this.request<any>({
        url: `/api/book/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: book,
      });
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateBook(id: string, data: Book) {
    try {
      const response = await this.request<Book>({
        url: `/api/book/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      return response;
    } catch (error) {
      console.error(`Error updating book with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteBook(id: string) {
    try {
      const response = await this.request<Book>({
        url: `/api/book/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error(`Error Deleting book with ID ${id}:`, error);
      throw error;
    }
  }
}

const libraryApi = new LibraryApi();
export default libraryApi;
