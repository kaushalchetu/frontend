import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { token, setToken } = useSelector((state) => state.auth.user.token);

  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome! {currentUser.user.first_name}</strong>
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {localStorage.getItem('token')}
      </p> */}
      <p>
        <strong>Full Name:</strong> {currentUser.user.first_name + ' ' + currentUser.user.last_name}
      </p>
      <p>
        <strong>Phone:</strong> {currentUser.user.phone_no}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <strong>Role:</strong> {currentUser.user.role_id}
      <ul>
        {currentUser.user.roles}
      </ul>
    </div>
  );
};

export default Profile;
