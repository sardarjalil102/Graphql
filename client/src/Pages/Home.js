import React, { useState ,useEffect} from "react";
import "../App.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_QUOTES } from "../quries";
import { DELETE_QOUTES, UPDATE_QOUTE } from "../mutation";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../component/Spinner/Loader";
import { NetworkStatus } from "@apollo/client";

const Home = () => {
  const [qoutes, setQoutes] = useState([]);
  const [show, setShow] = useState(true);
  const [qouteName, setQouteName] = useState("");
  const [qoute, setQoute] = useState("");
  const [deleteQoute] = useMutation(DELETE_QOUTES, {
    refetchQueries: [
      { query: GET_ALL_QUOTES }, // DocumentNode object parsed with gql
    ],
    onCompleted: () => {
      toast.success("Qoute Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  

  const [updateQoute] = useMutation(UPDATE_QOUTE,{
    refetchQueries: [
      { query: GET_ALL_QUOTES }, // DocumentNode object parsed with gql
    ],
    onCompleted: () => {
      setShow(true)
      toast.success("Qoute Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const { loading, error, data, stopPolling, networkStatus, startPolling } =
    useQuery(GET_ALL_QUOTES, {
        // pollInterval: 500,
      // fetchPolicy: "network-only",
      // onCompleted: () => console.log("called"),
      // fetchPolicy: "no-cache",
      // stopPolling(){
      // }
    });

  const navigate = useNavigate();
  React.useEffect(() => {
    setQoutes(data && data.quotes);
  }, [data]);

  const deleteQoutes = (id) => {
    const res = deleteQoute({
      variables: {
        qouteId: id,
      },
    });
  };

  const updateQoutes = () => {
    updateQoute({
      variables: {
        qouteUpdateInput: {
          id: qoute.id,
          name: qouteName,
        },
      },
    });
  };

  const handelQouteUpdate = (item) => {
    setQouteName(item.name);
    setQoute(item);
    setShow(false);
  };

  useEffect(()=>{
    startPolling(500)
    setTimeout(()=>{
      stopPolling()
    },1000)
  },[stopPolling])

  const renderUpDateQoutes = () => {
    return (
      <div class="col-lg-12 mx-auto">
        <div class="form-group m-4">
          <label for="exampleInputEmail1"></label>
          <input
            type="email"
            onChange={(e) => setQouteName(e.target.value)}
            value={qouteName}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group m-4">
          <button
            onClick={() => updateQoutes()}
            type="submit"
            class="btn  form-control form-group btn-success"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
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
        {" "}
        <Spinner />
      </div>
    );
  }

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
      <div class="container col-lg-12 py-5 text-white">
        <div class="row">
          <div class="col-lg-7 mx-auto">
            <div class="card border-0 shadow">
              <div class="card-body p-5">
                <div class="table-responsive">
                  <>
                    {" "}
                    {show ? (
                      <>
                        {" "}
                        <table class="table m-0">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Title</th>
                              <th scope="col">id</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {qoutes &&
                              qoutes.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>
                                      <ul class="list-inline m-0">
                                        <li class="list-inline-item">
                                          <button
                                            class="btn btn-success btn-sm rounded-1"
                                            type="button"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit"
                                            onClick={() =>
                                              handelQouteUpdate(item)
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-pen"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                            </svg>{" "}
                                          </button>
                                        </li>
                                        <li class="list-inline-item">
                                          <button
                                            class="btn btn-danger btn-sm rounded-1"
                                            type="button"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete"
                                            onClick={() =>
                                              deleteQoutes(item.id)
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-trash"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                              <path
                                                fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                              />
                                            </svg>{" "}
                                          </button>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <button
                          class="btn btn-primary btn-sm m-3 rounded-2"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => navigate("/admin/createQoute")}
                        >
                          Create New +
                        </button>
                      </>
                    ) : (
                      renderUpDateQoutes()
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
