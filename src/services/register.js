import http from "./httpService";
import apiUrl from "../config.json";

export function register(User) {
  return http.post(apiUrl.api_endpoint + "User", User);
}
