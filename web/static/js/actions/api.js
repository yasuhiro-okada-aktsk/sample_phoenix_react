export const METHOD_GET = "get";
export const METHOD_POST = "post";

export function createMeta(url, params, method = METHOD_GET, successActionCreator, failureActionCreator) {
  return {
    api: {
      url: url,
      params: params,
      method: method,
      success: successActionCreator,
      failure: failureActionCreator
    }
  }
}
