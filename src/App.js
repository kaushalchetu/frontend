import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { clearMessage } from "./redux/actions/message";
import './sass/_main.scss';
import Layout from './components/Layout';
import Login from "./components/Login/index";
import Dashboard from "./components/Admin/Dashboard";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Roles from "./components/Roles";
import UserDetails from "./components/Users/UserDetails";
import RoleDetails from "./components/Roles/RoleDetails";

const history = createBrowserHistory();

function App() {

  const [checkToken, setCheckToken] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
    if (localStorage.getItem('token')) {
      setCheckToken(true)
    } else {
      setCheckToken(false)
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!currentUser ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/users/add" element={<UserDetails />} />
            <Route path="/users/edit/:id" element={<UserDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles/add" element={<RoleDetails />} />
            <Route path="/roles/edit/:id" element={<RoleDetails />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </Layout>
      )}

    </BrowserRouter>
  );
}

export default App;
