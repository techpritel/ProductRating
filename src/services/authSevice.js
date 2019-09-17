import http from "./httpService";
import apiUrl from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
export async function login(email, password) {
  const { data } = await http.post(apiUrl.api_endpoint + "authenticate", {
    email,
    password
  });
  localStorage.setItem(tokenKey, data);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwtToken = localStorage.getItem(tokenKey);
    return jwtDecode(jwtToken);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  
  try {
    return localStorage.getItem(tokenKey);
    console.log(tokenKey);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};
