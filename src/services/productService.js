import http from "./httpService";
import apiUrl from "../config.json";
export function getProducts() {
  return http.get(apiUrl.api_endpoint + "products");
}

export function deleteProduct(productId) {
  return http.delete(apiUrl.api_endpoint + "products/" + productId);
}

export function saveProduct(product) {    
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(apiUrl.api_endpoint + "products/" + product._id , body);
  }
  return http.post(apiUrl.api_endpoint + "products",product);
}
export function getProduct(id) {
  return http.get(apiUrl.api_endpoint + "products/" + id);
}
