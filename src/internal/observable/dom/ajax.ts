import {  AjaxObservable, AjaxCreationMethod  } from './AjaxObservable';
import { AjaxConfig, AjaxConfigCreationMethod } from 'rxjs/internal/observable/dom/ajaxExt';
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

export const ajaxInterceptors: AjaxConfigCreationMethod = AjaxConfig.create;