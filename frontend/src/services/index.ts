const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface ApiRequestParameters {
  endpoint: string;
  pathParam?: string;
  parameters?: string;
  timeout?: number;
}

export class Api {
  private static composeUrl(params: ApiRequestParameters) {
    return (
      BASE_URL +
      params.endpoint +
      (params.pathParam ? "/" + params.pathParam : "") +
      (params.parameters ? "?" + params.parameters : "")
    );
  }

  private static async makeRequest(
    url: string,
    method: string = "GET",
    timeout = 8000
  ) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      signal: controller.signal,
      method,
    });
    clearTimeout(id);

    if (!response.ok) throw Error(await response.text());

    return response.json();
  }

  static async get(params: ApiRequestParameters) {
    const url = Api.composeUrl(params);

    return Api.makeRequest(url, "GET", params.timeout);
  }

  static async post(params: ApiRequestParameters) {
    const url = Api.composeUrl(params);

    return Api.makeRequest(url, "POST", params.timeout);
  }

  static async put(params: ApiRequestParameters) {
    const url = Api.composeUrl(params);

    return Api.makeRequest(url, "PUT", params.timeout);
  }

  static async delete(params: ApiRequestParameters) {
    const url = Api.composeUrl(params);

    return Api.makeRequest(url, "DELETE", params.timeout);
  }
}
