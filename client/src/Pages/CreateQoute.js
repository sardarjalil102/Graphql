import React, { useState } from "react";
import { CREATE_QOUTE } from "../mutation";
import { useMutation } from "@apollo/client";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const CreateQoute = () => {
  const navigate = useNavigate();
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QOUTE, {
    onCompleted: () => {
      // navigate("/");
      toast.success("Qoute Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
       navigate("/");
      }, 2000);
    },
  });
  
  const [value, setValue] = useState({
    des: "",
  });

  const handleonChange = (event, key) => {
    setValue({
      ...value,
      [key]: event.target.value,
    });
  };

  const onSubmit = () => {
    createQuote({
      variables: {
        name: value.des,
      },
    });
    setTimeout(() => {
      if (data) {
        console.log("Data is", data);
      }
    }, 1000);
  };

  return (
    <div
      className={
        "vh-100 d-flex col-lg-12 align-items-center justify-content-center"
      }
      style={{
        backgroundSize: "cover",
        backgroundRepeat: " no-repeat",
        backgroundImage:
          "url('https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg')",
      }}
    >
      <div className="card col-lg-6 p-5">
        <fieldset>
          <legend>Create New Qoute</legend>
          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">
              Desciption:
            </label>
            <input
              type="text"
              name="des"
              id="disabledTextInput"
              class="form-control"
              onChange={(e) => handleonChange(e, "des")}
              placeholder="Create Qoute"
              style={{borderRadius:'30px'}}
            />
          </div>
          <button
            onClick={() => onSubmit()}
            type="submit"
            style={{borderRadius:'30px'}}
            class="btn btn-success form-control form-control-lg"
          >
            Submit
          </button>
        </fieldset>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateQoute;
