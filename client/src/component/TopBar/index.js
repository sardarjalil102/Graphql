import React from "react";
import { Logout, useAuthState, useAuthDispatch } from "../../Context";

const TopBar = () => {
  const dispatch=useAuthDispatch()
  return (
    <nav class="navbar p-3 navbar-light bg-light justify-content-between">
      <a class="navbar-brand">Graph Ql</a>
        <button onClick={()=>Logout(dispatch)} class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Logout
        </button>
    </nav>
  );
};

export default TopBar;
