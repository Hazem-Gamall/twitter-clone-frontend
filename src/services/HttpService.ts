import { AxiosInstance } from "axios";

export interface Entity {
  id: string | number;
}

export class HttpService {
  endpoint: string;
  apiClient: AxiosInstance;
  constructor(endpoint: string, apiClient: AxiosInstance) {
    this.endpoint = endpoint;
    this.apiClient = apiClient;
  }

  list<T>(params = {}) {
    const controller = new AbortController();
    const request = this.apiClient.get<T[]>(`${this.endpoint}/`, {
      signal: controller.signal,
      params: params,
    });
    return { request, cancel: () => controller.abort() };
  }

  create<T, S>(data: T) {
    const controller = new AbortController();
    const request = this.apiClient.post<S>(`${this.endpoint}/`, data, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  retrieve<T>(id: string) {
    const controller = new AbortController();
    const request = this.apiClient.get<T>(`${this.endpoint}/${id}/`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete<T extends Entity>(entity: T) {
    const controller = new AbortController();
    const request = this.apiClient.delete<T>(`${this.endpoint}/${entity.id}/`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  patch<T>(id: string, data: T) {
    const controller = new AbortController();
    const request = this.apiClient.patch(`${this.endpoint}/${id}/`, data, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  put<T extends Entity>(entity: T, data: T) {
    const controller = new AbortController();
    const request = this.apiClient.put(`${this.endpoint}/${entity.id}/`, data, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}
