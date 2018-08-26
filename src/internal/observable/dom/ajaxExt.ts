import { AjaxRequest, AjaxResponse, AjaxError } from 'rxjs/Rx';
import { isArray } from '../../util/isArray';

export type AjaxRequestInterceptor = ((req: AjaxRequest|AjaxError, config?: any, ...vargs: any[]) => AjaxRequest|AjaxError);

export type AjaxResponseInterceptor = ((req: AjaxResponse|AjaxError, config?: any, ...vargs: any[]) => AjaxResponse|AjaxError);

export class AjaxConfig {
  private static _instance: AjaxConfig;
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
  // Options request interceptors.
  private _optionsRequestInterceptors: AjaxRequestInterceptor[];
  private _optionsResponseInterceptors: AjaxResponseInterceptor[];
  // Trace request interceptors.
  private _traceRequestInterceptors: AjaxRequestInterceptor[];
  private _traceResponseInterceptors: AjaxResponseInterceptor[];

  private constructor (requestInterceptors?: AjaxRequestInterceptor|AjaxRequestInterceptor[],
                       responseInterceptors?: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    this._requestInterceptors = (requestInterceptors) ? (isArray(requestInterceptors)) ? requestInterceptors : [requestInterceptors] : [];
    this._responseInterceptors = (responseInterceptors) ? (isArray(responseInterceptors)) ? responseInterceptors : [responseInterceptors] : [];
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

  public addOptionsRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._optionsRequestInterceptors.concat(interceptors);
    } else {
      this._optionsRequestInterceptors.push(interceptors);
    }
  }

  public addOptionsResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._optionsResponseInterceptors.concat(interceptors);
    } else {
      this._optionsResponseInterceptors.push(interceptors);
    }
  }

  public addTraceRequestInterceptor(interceptors: AjaxRequestInterceptor|AjaxRequestInterceptor[]) {
    if (isArray(interceptors)) {
      this._traceRequestInterceptors.concat(interceptors);
    } else {
      this._traceRequestInterceptors.push(interceptors);
    }
  }

  public addTraceResponseInterceptor(interceptors: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    if (isArray(interceptors)) {
      this._traceResponseInterceptors.concat(interceptors);
    } else {
      this._traceResponseInterceptors.push(interceptors);
    }
  }

  public static Instance () {
    return AjaxConfig._instance || (AjaxConfig._instance = new AjaxConfig());
  }

  public RequestInterceptors () {
    return this._requestInterceptors;
  }

  public ResponseInterceptors () {
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

  public OptionsRequestInterceptors () {
    return this._optionsRequestInterceptors;
  }

  public OptionsResponseInterceptors () {
    return this._optionsResponseInterceptors;
  }

  public TraceRequestInterceptors () {
    return this._traceRequestInterceptors;
  }

  public TraceResponseInterceptors () {
    return this._traceResponseInterceptors;
  }
}
