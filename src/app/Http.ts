import axios, { AxiosRequestConfig } from 'axios'

export const rootBackendUrl = process.env.REACT_APP_ROOT_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: rootBackendUrl,
})

axiosInstance.interceptors.response.use(response => response.data)

class Http {
  public static get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseDto<T>> {
    return axiosInstance.get(url, config)
  }

  public static post<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.post(url, body, config)
  }

  public static put<T>(url: string, body?: any): Promise<ResponseDto<T>> {
    return axiosInstance.put(url, body)
  }

  public static patch<T>(url: string, body?: any): Promise<ResponseDto<T>> {
    return axiosInstance.patch(url, body)
  }

  public static delete<T>(url: string): Promise<ResponseDto<T>> {
    return axiosInstance.delete(url)
  }
}

export type ResponseDto<T> = {
  response: T
}

export default Http
