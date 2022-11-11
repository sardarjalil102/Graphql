import React, { useState } from "react";
import "../App.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_USERS,
  DELETE_USER,
  GET_SINGLE_USER,
  GET_ALL_QUOTES,
} from "../quries";
const Home = () => {
  const [qoutes, setQoutes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [qouteName, setQouteName] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  const auth_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzExOTMzNWQ0NWRhZjhmYmY0NjI5NjMiLCJpYXQiOjE2NjIwOTY0Nzl9.EY-OcF3TDEVtM0ONgvbC8MiVTJ5ogZiGPnhRglo4TBI'
  React.useEffect(() => {
    setQoutes(data?.quotes)
  }, [data]);

  

  const deleteQoutes = (item) => {
    console.log("item", item);
    fetch("http://localhost:4000", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `  
        mutation deleteQoute($qouteId:String!){
          deleteQoute(qouteId:$qouteId){
           name
         }
       }
        `,
        variables: {
          qouteId: item.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        // getAllQoutes()
      })
      .catch((error) => console.log(error));
    // deleteUser({ variables: { UserId: '6308b5a098b1bed50f1bbe4b'  } });
  };

  const createQuote = (item) => {
    console.log("item", item);
    fetch("http://localhost:4000", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "authorization":auth_token
      },
      body: JSON.stringify({
        query: `  
        mutation createQoutes($name:String!){
          createQuote(name:$name)
        }
        `,
        variables: {
          name: qouteName,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setShowCreate(false)
        // getAllQoutes()
        setQoutes(data?.quotes)
      })
      .catch((error) => console.log(error));
    // deleteUser({ variables: { UserId: '6308b5a098b1bed50f1bbe4b'  } });
  };

  const renderCreateForm=()=>{
    return(
      <>
      <div class="form-group  m-4">
        <label className={'m-2'} for="exampleInputEmail1">Enter  Qoute Name</label>
        <input onChange={(e)=>setQouteName(e.target.value)} type="text" class="form-control m-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Qoute Name" />
        <button onClick={()=>createQuote()} type="submit" class="btn btn-success m-2">Create Qoute +</button>
      </div>
      </>
    )
  }
  if(loading){
    return <h3>Loading....</h3> 
  }

  // if(qoutes.length < 1){
  //   return <h3>No Qoutes Found</h3>
  // }

  return (
    <div
      className={"d-flex col-lg-12 align-items-center justify-content-center"}
    >
      <div class="card userDiv m-5  col-lg-6">
       {!showCreate ?<div className={"m-2 col-lg-3"}>
          <button
            type="button"
            class="btn m-1 btn-primary"
            onClick={() => setShowCreate(true)}
          >
            Create New +
          </button>
        </div>  :null}

        {!showCreate ? (
          <table class="table  ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Qoutes</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {qoutes &&
                qoutes.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>
                        <>
                          <button type="button" class="btn m-1 btn-primary">
                            Update
                          </button>
                          <button
                            onClick={() => deleteQoutes(item)}
                            type="button"
                            class="btn m-1 btn-danger"
                          >
                            Delete
                          </button>
                        </>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : renderCreateForm()}
      </div>
    </div>
  );
};

export default Home;
