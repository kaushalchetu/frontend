import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useNavigate, useParams } from 'react-router-dom'
import { getAllRolesOptions } from "../../redux/actions/users";
import { updateProfile } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
// import BASE_URL from "../../helpers/baseUrl";
import BASE_URL from "../../helpers/baseUrl";

//const API_URL = "http://127.0.0.1:8000";
// const BASE_URL = "http://127.0.0.1:8000";

// Validations code start
const required = (value) => {
  if (!value) {
    return (
      <div className="error text-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="error text-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validPhoneNumber = (value) => {
  if (!value.match(/^\d{10}$/)) {
    return (
      <div className="error text-danger" role="alert">
        The phone number must be 10 digit number.
      </div>
    );
  }
};

const vfirstname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="error text-danger" role="alert">
        The firstname must be between 2 and 20 characters.
      </div>
    );
  }
};

const vlastname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="error text-danger" role="alert">
        The lastname must be between 2 and 20 characters.
      </div>
    );
  }
};
// Validations code end

const Profile = ({ match }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [fields, setFields] = useState({
    id: '',
    roleId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: ''
  })
  const [successful, setSuccessful] = useState(false);

  const { roleOptions } = useSelector(state => state.users);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(clearMessage())
    dispatch(getAllRolesOptions())
    setFields({
      id: user.id,
      roleId: user.role_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNo: user.phone_no,
      profileImage: user.profile_image
    })
    return () => {
      dispatch(clearMessage())
    }

  }, [])

  const { message } = useSelector(state => state.message);
  const { isFetching } = useSelector(state => state.users);

  const handleProfile = (e) => {
    e.preventDefault();

    //setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);
      //For image upload use formdata code start
      const formData = new FormData();
      formData.append('firstName', fields.firstName);
      formData.append('lastName', fields.lastName);
      formData.append('email', fields.email);
      formData.append('phoneNo', fields.phoneNo);
      formData.append('profileImage', fields.profileImage)
      //For image upload use formdata code end
  
      if (user.id) {
        //dispatch(updateProfile(fields))
        dispatch(updateProfile(formData))
          .then(() => {
            setSuccessful(true);
            setLoading(false);
            navigate("/profile");
          })
          .catch(() => {
            setSuccessful(false);
            setLoading(false);
          });
      }

    }
  };

  const handleChange = event => {
    const value = event.target.name == 'phoneNo' ? event.target.value.replace(/\D/g, "") : event.target.value;

    setFields({
      ...fields,
      [event.target.name]: value
    })
  }

  const handleFile = event => {

    const value = event.target.files[0]

    setFields({ ...fields, [event.target.name]: value  })
    
  }
  console.log("fields.....", fields)
  return (
    <div className="content-wrapper">
      {console.log(BASE_URL)}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Update Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Update Profile</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <Form onSubmit={handleProfile} ref={form}>
                  {message && (
                    <div className="form-group">
                      <div className={successful ? "alert alert-success custom-alert" : "alert alert-danger custom-alert"} role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <div className="card-body">
                  <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <img class="profile-user" src={`${BASE_URL}/images/` + user.profile_image} width="242" />
                          <label htmlFor="lastName">Profile Pic</label>
                          <Input
                            type="file"
                            accept="image/*"
                            name="profileImage"
                            className="form-group"
                            onChange={handleFile}
                            disabled={isFetching}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="roleId">Role</label>
                          <Select
                            className="form-control"
                            name="roleId"
                            value={fields.roleId}
                            validations={[required]}
                            onChange={handleChange}
                            disabled={isFetching}>
                            <option value="" disabled>Select Role</option>
                            {roleOptions.map(option => (
                              <option key={`${option.id}`} value={option.id}>{option.name}</option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <Input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={fields.firstName}
                            onChange={handleChange}
                            validations={[required, vfirstname]}
                            disabled={isFetching}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <Input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={fields.lastName}
                            onChange={handleChange}
                            validations={[required, vlastname]}
                            disabled={isFetching}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <Input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={fields.email}
                            onChange={handleChange}
                            validations={[required, validEmail]}
                            disabled={isFetching}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="phoneNo">Phone Number</label>
                          <Input
                            type="text"
                            maxLength={10}
                            name="phoneNo"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            value={fields.phoneNo}
                            onChange={handleChange}
                            validations={[required, validPhoneNumber]}
                            disabled={isFetching}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Update Profile</span>
                    </button>

                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                  </div>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
