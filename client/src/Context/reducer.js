import React, { useReducer } from "react";
 
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("token")
console.log('savedToken',token)
export const initialState = {
  userDetails: "" || user,
  token: token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  console.log('action',action.payload)
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        // user: action.payload.user,
        token: action.payload,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};