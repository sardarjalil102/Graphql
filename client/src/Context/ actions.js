export const LoginUser = (dispatch, token) => {
  localStorage.setItem("token", token);
  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  dispatch({ type: "LOGIN_SUCCESS", payload: token });

};

export const LoginError = (dispatch, loginPayload) => {
  dispatch({ type: "LOGIN_ERROR" });
};

export const  Logout =(dispatch) =>{
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
