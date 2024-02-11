import React, { useState, useEffect, Fragment, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import { AuthContext } from "./store/AuthContext";

function App() {
const authCtx=useContext(AuthContext)
  return (
    <Fragment>
      <MainHeader/>
      <main>
        {! authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.onLogout} />}
      </main>
    </Fragment>
  );
}

export default App;
