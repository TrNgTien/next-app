interface IRequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
  params?: object;
  body?: object;
  configs?: object;
}

const HTTP = "http";
const HTTPS = "https";

export const stringify = (params: Record<string | symbol, any>) => {
  const normalizedParams: Record<string | symbol, any> = {};
  for (const key in params) {
    switch (typeof params[key]) {
      case "number":
      case "string": {
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
    return url.startsWith("http:") ? HTTP : HTTPS;
  }

  // -------------------------------------------------------------
  // SEND REQUEST
  // -------------------------------------------------------------
  async send(opts: IRequestOptions, logger?: any) {
    const t = new Date().getTime();

    const { url, method = "GET", params, body, configs } = opts;
    const props = {
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...configs,
    };

    let requestUrl = url;
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }

    logger?.info("[send] URL: %s | Props: %o", requestUrl, props);
    const response = await fetch(requestUrl, props);

    logger?.info(`[network]][send] Took: %s(ms)`, new Date().getTime() - t);
    return response;
  }

  // -------------------------------------------------------------
  // GET REQUEST
  // -------------------------------------------------------------
  async get(opts: IRequestOptions) {
    const { url, params, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: "GET",
      params,
      configs,
    });
    return response;
  }

  // -------------------------------------------------------------
  // POST REQUEST
  // -------------------------------------------------------------
  async post(opts: IRequestOptions) {
    const { url, body, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: "POST",
      body,
      configs,
    });
    return response;
  }
}

export const networkHelperInstance = NetworkHelper.getInstance();
