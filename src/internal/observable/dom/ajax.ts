import {  AjaxObservable, AjaxCreationMethod  } from './AjaxObservable';
import { AjaxConfig, AjaxConfigCreationMethod } from './ajaxExt';

/**
 * There is an ajax operator on the Rx object.
 *
 * It creates an observable for an Ajax request with either a request object with
 * url, headers, etc or a string for a URL.
 *
 * ## Using ajax.getJSON() to fetch data from API.
 * ```javascript
 * import { ajax } from 'rxjs/ajax';
 * import { map, catchError } from 'rxjs/operators';
 *
 * const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`).pipe(
 *   map(userResponse => console.log('users: ', userResponse)),
 *   catchError(error => console.log('error: ', error))
 * ));
 * ```
 */
export const ajax: AjaxCreationMethod = AjaxObservable.create;
/**
 * There is global ajax Interceptors configurations singleton in RX
 *
 * It creates a singleton wrapper for ajax interceptor configurations. It takes an array of
 * iterceptors or just interceptors for intercepting the request and the response.
 *
 * import { ajaxInterceptors } from 'rxjs/ajax';
 *
 * const ajaxConfig = ajaxInterceptors((req: AjaxRequest) => {
 *  req.headers = {...req.headers, Authorization: 'sdkjfkdfdfkdfdfdkdffdfd'};
 *  return req;
 * }, (res: AjaxResponse) => {
 *  // Do something with the response data (cache it for example)
 *  return res;
 * })
 *
 * Or another usage:
 *
 * const ajaxConfig = ajaxInterceptors([(req: AjaxRequest) => {
 *  req.headers = {...req.headers, Authorization: 'sdkjfkdfdfkdfdfdkdffdfd'};
 *  return req;
 * }], [(res: AjaxResponse) => {
 *  // Do something with the response data (cache it for example)
 *  return res;]
 * })
 *
 * Or another usage:
 * const ajaxConfig = ajaxInterceptors();
 *
 * More interceptors can be added later:
 *
 * ajaxConfig.addGetRequestInterceptor(AjaxRequestInterceptor or AjaxRequestInterceptor[])
 *
 * And the same can be done with all of the rest of the Requests.
 */
export { AjaxRequestInterceptor, AjaxResponseInterceptor } from './ajaxExt';
export const ajaxInterceptors: AjaxConfigCreationMethod = AjaxConfig.create;