import React, { useEffect } from "react";
// Styles
import "./App.css";
// Import Components
import Home from "./containers/Home";
import SignUpIn from "./containers/SignUpIn";
import Header from "./components/Header";
import Loader from "./components/Loader";

import axiosInterceptor from "./utils/axios-interceptor";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/authActions";
import { RootState } from "./Types";

axiosInterceptor();

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Header />
      {isLoading ? <Loader /> : isAuthenticated ? <Home /> : <SignUpIn />}
      <Loader />
    </div>
  );
};

export default App;
