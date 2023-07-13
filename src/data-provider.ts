import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";
import { stringify } from "query-string";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

export const dataProvider = (apiUrl: string): any => ({
  getList: async ({ resource }: any) => {
      const url = `${apiUrl}/${resource}`;

      const { data, headers } = await axiosInstance.get(url);

      const total = +headers["x-total-count"];

      return {
          data,
          total,
      };
  }
});