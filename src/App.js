import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './sass/_main.scss';
import Layout from './components/Layout';
import Login from "./components/Login/index";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import Profile from "./components/Admin/Profile";
import ChangePassword from "./components/Admin/ChangePassword";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Users";
import Roles from "./components/Roles";
import UserDetails from "./components/Users/UserDetails";
import RoleDetails from "./components/Roles/RoleDetails";
import Reports from "./components/Reports";
import ImportReports from "./components/Reports/ImportReports"
import AuthVerify from "./components/AuthVerify";
import ErrorBoundary from "./components/ErrorBoundary";

const history = createBrowserHistory();

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()); // clear message when changing location
  //   });
  //   if (localStorage.getItem('token')) {
  //     setCheckToken(true)
  //   } else {
  //     setCheckToken(false)
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <AuthVerify />
      {!currentUser ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/reset/password/:id" element={<ResetPassword />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
            <Route exact path="/profile" element={<Profile />} />
            {/* Error boundary code start */}
            {/* <Route
              exact
              path="/profile"
              element={(
                <ErrorBoundary>
                  <Profile />
                </ErrorBoundary>
            )}
            /> */}
            {/* Error boundary code end */}
            <Route path="/change/password" element={<ChangePassword />} />
            <Route path="/users/add" element={<UserDetails />} />
            <Route path="/users/edit/:id" element={<UserDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles/add" element={<RoleDetails />} />
            <Route path="/roles/edit/:id" element={<RoleDetails />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/import/reports" element={<ImportReports />} />
          </Routes>
        </Layout>
      )}

    </BrowserRouter>
  );
}

export default App;
