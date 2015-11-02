export const METHOD_GET = "get";
export const METHOD_POST = "post";

export function createApiMeta(url, params, method = METHOD_GET) {
  return {
    api: {
      url: url,
      params: params,
      method: method
    }
  }
}
