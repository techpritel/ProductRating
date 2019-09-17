
import http from './httpService';
import apiUrl from '../config.json';
export function getcategories() {

    return http.get(apiUrl.api_endpoint + 'productcategory')
}