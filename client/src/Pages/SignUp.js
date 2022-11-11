import React, { useEffect } from "react";
import { CREATE_USER } from "../../src/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useMutation,
} from "@apollo/client";
import {  useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signupUser, { data, loading, error }] = useMutation(CREATE_USER,{
    onCompleted: () => {
      toast.success("User Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/')
    },
  });

  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
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


  const singnUpUser = async () => {
    signupUser({
      variables: {
        userNew: value,
      },
    });

   
  };

  useEffect(()=>{
    if(error){
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  },[error])


  return (
    <div
        className={"vh-100 d-flex col-lg-12 align-items-center justify-content-center"}
        style={{backgroundSize: 'cover' ,backgroundRepeat:' no-repeat', backgroundImage: "url('https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg')"}}>

      <div className="card p-5 m-6  col-lg-5">
        <img
          style={{ height: "100px", width: "100px" }}
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          className="img-fluid d-flex align-self-center"
          alt="Responsive image "
        />
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            onChange={(e) => handleonChange(e, "firstName")}
            placeholder={"First Name"}
            className="form-control form-control-lg"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Last Name
          </label>
          <input
            onChange={(e) => handleonChange(e, "lastName")}
            placeholder={"last Name"}
            type="text"
            className="form-control form-control-lg"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => handleonChange(e, "email")}
            placeholder={"email"}
            className="form-control form-control-lg"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => handleonChange(e, "password")}
            placeholder={"password"}
            className="form-control form-control-lg"
            id="exampleInputPassword1"
          />
        </div>
        <button
          onClick={() => singnUpUser()}
          type="submit"
          style={{
            background: '#4e54c8', /* fallback for old browsers */
            background: '-webkit-linear-gradient(to right, #a8e063, #56ab2f)',
            background: "linear-gradient(to right, #a8e063, #56ab2f)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: "#fff",
          }}
          className="btn btn-success"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
