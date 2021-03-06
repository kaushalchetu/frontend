import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useNavigate, useParams } from 'react-router-dom'
import { createUser, getAllRolesOptions, getUser, clearUser, updateUser } from "../../redux/actions/users";

//Validations code start
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

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="error text-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
//Validations code end

const UserDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();

  const { id } = useParams();
  const form = useRef();
  const checkBtn = useRef();

  const [fields, setFields] = useState({
    roleId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: ''
  })
  const [successful, setSuccessful] = useState(false);

  const { roleOptions, user } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getAllRolesOptions())
    if (id) {
      dispatch(getUser(id))
      return () => {
        dispatch(clearUser())
      }
    }
  }, [])

  useEffect(() => {
    if (user && id) {
      setFields({
        roleId: user.role_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNo: user.phone_no,
        password: '',
      })
    }
    else {
      setFields({
        roleId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        password: ''
      })
    }
  }, [user])

  const { isFetching } = useSelector(state => state.users);

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);

      if (id) {
        dispatch(updateUser(id, fields))
          .then(() => {
            setSuccessful(true);
            setLoading(false);

            setTimeout(() => {
              //history.push("/users");
              navigate("/users");
            }, 1000);
          })
          .catch(() => {
            setSuccessful(false);
            setLoading(false);
          });
      }
      else {
        dispatch(createUser(fields))
          .then(() => {
            setSuccessful(true);
            setLoading(false);

            setTimeout(() => {
              //history.push("/users");
              navigate("/users");
            }, 1000);

          })
          .catch(() => {
            setSuccessful(false);
            setLoading(false);
          });
      }

    }
  };

  const handleChange = event => {
    const value = event.target.name == 'phoneNo' ? event.target.value.replace(/\D/g, "") : event.target.name == 'firstName' ? event.target.value.replace(/[^\w\s]/gi, "") : event.target.name == 'lastName' ? event.target.value.replace(/[^\w\s]/gi, "") : event.target.value;

    setFields({
      ...fields,
      [event.target.name]: value
    })
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Create User</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Create User</li>
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
                <Form onSubmit={handleRegister} ref={form}>
                  <div className="card-body">
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
                      {!id && (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                              value={fields.password}
                              onChange={handleChange}
                              validations={[required, vpassword]}
                              disabled={isFetching}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>{id ? 'Update User' : 'Create User'}</span>
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

export default UserDetails;
