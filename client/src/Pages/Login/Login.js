import React from "react";
import { LOGIN_USER } from "../../mutation";
import {
  useMutation,
} from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import { LoginUser,  useAuthDispatch } from "../../Context";
import {  useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(item) {
      console.log("item is", item?.user?.token);
      LoginUser(dispatch, item?.user?.token);
      navigate("/");
    },
  });
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });

  const handleonChange = (evt, key) => {
    const ev = evt.target.value;
    setValue({
      ...value,
      [key]: ev,
    });
  };

  const _handleLogin = () => {
    signinUser({
      variables: {
        userSignin: value,
      },
    });
    setTimeout(() => {
      if (error) {
        console.log("error", error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }, 1000);
  };

  return (
    <section
      class="vh-100 bg-image"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: " no-repeat",
        backgroundImage:
          "url('https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg')",
      }}
    >
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-4 col-xl-5">
              <div class="card" style={{ borderRadius: "10px" }}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Login</h2>
                  <div class="form-outline mb-2">
                    <label class="form-label" for="form3Example1cg">
                      Email
                    </label>
                    <input
                      onChange={(e) => handleonChange(e, "email")}
                      type="text"
                      id="form3Example1cg"
                      class="form-control form-control-lg"
                    />
                  </div>
                  <div class="form-outline mb-2">
                    <label class="form-label" for="form3Example4cg">
                      Password
                    </label>
                    <input
                      onChange={(e) => handleonChange(e, "password")}
                      type="password"
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                    />
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      class="form-control form-control-lg"
                      type="button"
                      onClick={() => _handleLogin()}
                      style={{
                        background: "#4e54c8" /* fallback for old browsers */,
                        background:
                          "-webkit-linear-gradient(to right, #a8e063, #56ab2f)",
                        background:
                          "linear-gradient(to right, #5e9693, #ffffff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                        color: "#fff",
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <p class="text-center text-muted mt-3 mb-0">
                    Not Yet Register?{" "}
                    <a href="#!" class="fw-bold text-body">
                      <u> Register here</u>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
