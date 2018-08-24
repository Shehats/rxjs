import { AjaxRequest, AjaxResponse, AjaxError } from 'rxjs/Rx';
import { isArray } from '../../util/isArray';

export type AjaxRequestInterceptor = ((req: AjaxRequest|AjaxError, config?: any, ...vargs: any[]) => AjaxRequest|AjaxError);

export type AjaxResponseInterceptor = ((req: AjaxResponse|AjaxError, config?: any, ...vargs: any[]) => AjaxResponse|AjaxError);

export class AjaxConfig {
  private _requestInterceptors: AjaxRequestInterceptor[];
  private _responseInterceptors: AjaxResponseInterceptor[];
  private _instance: AjaxConfig;
  private constructor (requestInterceptors?: AjaxRequestInterceptor|AjaxRequestInterceptor[],
                       responseInterceptors?: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    this._requestInterceptors = (isArray(requestInterceptors)) ? requestInterceptors : [requestInterceptors];
    this._responseInterceptors = (isArray(responseInterceptors)) ? responseInterceptors : [responseInterceptors];
  }

  public create (requestInterceptors?: AjaxRequestInterceptor|AjaxRequestInterceptor[],
                 responseInterceptors?: AjaxResponseInterceptor|AjaxResponseInterceptor[]) {
    return this._instance || new AjaxConfig(requestInterceptors, responseInterceptors);
  }

  public addRequestInterceptor(interceptor: AjaxRequestInterceptor) {
    this._requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: AjaxResponseInterceptor) {
    this._responseInterceptors.push(interceptor);
  }

  public get Instance () {
    return this._instance = new AjaxConfig();
  }

  public get RequestInterceptors () {
    return this._requestInterceptors;
  }

  public get ResponseInterceptors () {
    return this._responseInterceptors;
  }
}