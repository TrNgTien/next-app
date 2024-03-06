interface IRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  params?: object;
  body?: object;
  configs?: object;
}

const HTTP = 'http';
const HTTPS = 'https';

const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

export const stringify = (params: Record<string | symbol, any>) => {
  const normalizedParams: Record<string | symbol, any> = {};
  for (const key in params) {
    switch (typeof params[key]) {
      case 'number':
      case 'string': {
        normalizedParams[key] = params[key];
        break;
      }
      default: {
        normalizedParams[key] = JSON.stringify(params[key]);
        break;
      }
    }
  }
  const rs = new URLSearchParams(normalizedParams);
  return rs.toString();
};

export class NetworkHelper {
  private static instance: NetworkHelper;

  static getInstance() {
    if (!this.instance) {
      this.instance = new NetworkHelper();
    }

    return this.instance;
  }

  getProtocol(url: string) {
    return url.startsWith('http:') ? HTTP : HTTPS;
  }

  // -------------------------------------------------------------
  // SEND REQUEST
  // -------------------------------------------------------------
  async send(opts: IRequestOptions) {
    const { url, method = 'GET', params, body, configs } = opts;
    const props = {
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: DEFAULT_HEADER,
      ...configs,
    };

    let requestUrl = url;
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }

    const response = await fetch(requestUrl, props);

    return response.json();
  }

  // -------------------------------------------------------------
  // GET REQUEST
  // -------------------------------------------------------------
  async get(opts: IRequestOptions) {
    const { url, params, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'GET',
      params,
      configs,
    });
    return response;
  }

  // -------------------------------------------------------------
  // POST REQUEST
  // -------------------------------------------------------------
  async post(opts: IRequestOptions) {
    const { url, body, configs, params, ...rest } = opts;

    const props = {
      ...rest,
      url,
      method: 'POST',
      body: JSON.stringify(body),
      configs,
      headers: DEFAULT_HEADER,
    };

    let requestUrl = url;
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }

    const response = await fetch(requestUrl, props);

    return response.json();
  }
}

export const networkHelperInstance = NetworkHelper.getInstance();
