import { AjaxRequest, AjaxResponse, AjaxError } from 'rxjs/Rx';
import { isArray } from '../../util/isArray';
import { onErrorResumeNextStatic } from 'rxjs/internal/operators/onErrorResumeNext';

export type AjaxRequestInterceptor = ((req: AjaxRequest) => AjaxRequest);

export type AjaxResponseInterceptor = ((res: AjaxResponse) => AjaxResponse);

export type AjaxConfigCreationMethod = ((...args: any[]) => AjaxConfig);

export class AjaxConfig {
  private static _instance: AjaxConfig = null;
  // Shared interceptors.
  private _requestInterceptors: AjaxRequestInterceptor[];
  private _responseInterceptors: AjaxResponseInterceptor[];
  // Get request interceptors.
  private _getRequestInterceptors: AjaxRequestInterceptor[];
  private _getResponseInterceptors: AjaxResponseInterceptor[];
  // Post request interceptors.
  private _postRequestInterceptors: AjaxRequestInterceptor[];
  private _postResponseInterceptors: AjaxResponseInterceptor[];
  // Put request interceptors.
  private _putRequestInterceptors: AjaxRequestInterceptor[];
  private _putResponseInterceptors: AjaxResponseInterceptor[];
  // Delete request interceptors.
  private _deleteRequestInterceptors: AjaxRequestInterceptor[];
  private _deleteResponseInterceptors: AjaxResponseInterceptor[];

  private constructor (requestInterceptors?: AjaxRequestInterceptor|AjaxRequestInterceptor[],
                       responseInterceptors?: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(requestInterceptors)) {
      this._requestInterceptors = requestInterceptors;
    } else {
      this._requestInterceptors = (requestInterceptors) ? [requestInterceptors] : [];
    }
    if (isArray(responseInterceptors)) {
      this._responseInterceptors = responseInterceptors;
    } else {
      this._responseInterceptors = (responseInterceptors) ? [responseInterceptors] : [];
    }
    this._getRequestInterceptors = [];
    this._getResponseInterceptors = [];
    this._postRequestInterceptors = [];
    this._postResponseInterceptors = [];
    this._putRequestInterceptors = [];
    this._putResponseInterceptors = [];
    this._deleteRequestInterceptors = [];
    this._deleteResponseInterceptors = [];
  }

  public static create (requestInterceptors?: AjaxRequestInterceptor|AjaxRequestInterceptor[],
                        responseInterceptors?: AjaxResponseInterceptor|AjaxResponseInterceptor[]): AjaxConfig {
    return AjaxConfig._instance || (AjaxConfig._instance = new AjaxConfig(requestInterceptors, responseInterceptors));
  }

  public addRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._requestInterceptors.concat(interceptors);
    } else {
      this._requestInterceptors.push(interceptors);
    }
  }

  public addResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._responseInterceptors.concat(interceptors);
    } else {
      this._responseInterceptors.push(interceptors);
    }
  }

  public addGetRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._getRequestInterceptors.concat(interceptors);
    } else {
      this._getRequestInterceptors.push(interceptors);
    }
  }

  public addGetResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._getResponseInterceptors.concat(interceptors);
    } else {
      this._getResponseInterceptors.push(interceptors);
    }
  }

  public addPostRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._postRequestInterceptors.concat(interceptors);
    } else {
      this._postRequestInterceptors.push(interceptors);
    }
  }

  public addPostResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._postResponseInterceptors.concat(interceptors);
    } else {
      this._postResponseInterceptors.push(interceptors);
    }
  }

  public addPutRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._putRequestInterceptors.concat(interceptors);
    } else {
      this._putRequestInterceptors.push(interceptors);
    }
  }

  public addPutResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._putResponseInterceptors.concat(interceptors);
    } else {
      this._putResponseInterceptors.push(interceptors);
    }
  }

  public addDeleteRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._deleteRequestInterceptors.concat(interceptors);
    } else {
      this._deleteRequestInterceptors.push(interceptors);
    }
  }

  public addDeleteResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._deleteResponseInterceptors.concat(interceptors);
    } else {
      this._deleteResponseInterceptors.push(interceptors);
    }
  }

  public static Instance () {
    return AjaxConfig._instance || (AjaxConfig._instance = new AjaxConfig());
  }

  public static hasInstance () {
    return AjaxConfig._instance !== null;
  }

  public RequestInterceptors (): AjaxRequestInterceptor[] {
    return this._requestInterceptors;
  }

  public ResponseInterceptors (): AjaxResponseInterceptor[] {
    return this._responseInterceptors;
  }

  public GetRequestInterceptors () {
    return this._getRequestInterceptors;
  }

  public GetResponseInterceptors () {
    return this._getResponseInterceptors;
  }

  public PostRequestInterceptors () {
    return this._postRequestInterceptors;
  }

  public PostResponseInterceptors () {
    return this._postResponseInterceptors;
  }

  public PutRequestInterceptors () {
    return this._putRequestInterceptors;
  }

  public PutResponseInterceptors () {
    return this._putResponseInterceptors;
  }

  public DeleteRequestInterceptors () {
    return this._deleteRequestInterceptors;
  }

  public DeleteResponseInterceptors () {
    return this._deleteResponseInterceptors;
  }
}

const execRequestInterceptors = (ajaxRequest: AjaxRequest, interceptors: AjaxRequestInterceptor[]): AjaxRequest => {
  let req = ajaxRequest;
  interceptors.forEach(interceptor => {
    req = interceptor(req);
  });
  return req;
};

const execResponseInterceptors = (ajaxResponse: AjaxResponse, interceptors: AjaxResponseInterceptor[]): AjaxResponse => {
  let res = ajaxResponse;
  interceptors.forEach(interceptor => {
    res = interceptor(res);
  });
  return res;
};

export const reduceRequestInterceptors = (ajaxRequest: AjaxRequest): AjaxRequest => {
  let req = ajaxRequest;
  req = execRequestInterceptors(req, AjaxConfig.Instance().RequestInterceptors());
  switch (ajaxRequest.method) {
    case 'GET':
      return execRequestInterceptors(req, AjaxConfig.Instance().GetRequestInterceptors());
    case 'POST':
      return execRequestInterceptors(req, AjaxConfig.Instance().PostRequestInterceptors());
    case 'PUT':
      return execRequestInterceptors(req, AjaxConfig.Instance().PutRequestInterceptors());
    case 'DELETE':
      return execRequestInterceptors(req, AjaxConfig.Instance().DeleteRequestInterceptors());
    default:
      return req;
  }
};

export const reduceResponseInterceptors = (ajaxResponse: AjaxResponse): AjaxResponse => {
  let res = ajaxResponse;
  res = execResponseInterceptors(res, AjaxConfig.Instance().ResponseInterceptors());
  switch (ajaxResponse.request.method) {
    case 'GET':
      return execResponseInterceptors(res, AjaxConfig.Instance().GetResponseInterceptors());
    case 'POST':
      return execResponseInterceptors(res, AjaxConfig.Instance().PostResponseInterceptors());
    case 'PUT':
      return execResponseInterceptors(res, AjaxConfig.Instance().PutResponseInterceptors());
    case 'DELETE':
      return execResponseInterceptors(res, AjaxConfig.Instance().DeleteResponseInterceptors());
    default:
      return res;
  }
};
