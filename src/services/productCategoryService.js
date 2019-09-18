
import http from './httpService';
import apiUrl from '../config.json';
import { trackPromise } from 'react-promise-tracker';
export function getcategories() {

    return trackPromise(http.get(apiUrl.api_endpoint + 'productcategory'));
}