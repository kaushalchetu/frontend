import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate } from 'react-router-dom'
import { changePassword } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { logout } from "../../redux/actions/auth";

const ChangePassword = ({ match }) => {
    const newPassword = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [fields, setFields] = useState({
        oldPassword: '',
        newPassword: '',
        conPassword: '',
    })
    const [successful, setSuccessful] = useState(false);

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(clearMessage())
        return () => {
            dispatch(clearMessage())
        }

    }, [])

    const { message } = useSelector(state => state.message);
    const { isFetching } = useSelector(state => state.users);

    const required = (value) => {
        if (!value) {
            return (
                <div className="error text-danger" role="alert">
                    This field is required!
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

    const validateConfirmPassword = (value) => {
        if (value.length < 6 || value.length > 40) {
            return (
                <div className="error text-danger" role="alert">
                    The password must be between 6 and 40 characters.
                </div>
            );
        }

        else if (value !== newPassword.current.props.value) {
            return (
                <div className="error text-danger" role="alert">
                    The confirm password and new password is not match.</div>
            );
        }
    }

    const handleChangePassword = (e) => {
        e.preventDefault();

        setSuccessful(false)

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);

            if (user.id) {
                dispatch(changePassword(fields))
                    .then(() => {
                        setSuccessful(true);
                        setLoading(false);
                        dispatch(logout());
                        navigate("/");
                    })
                    .catch(() => {
                        setSuccessful(false);
                        setLoading(false);
                    });
            }

        }
    };

    const handleChange = event => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Change Password</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Change Password</li>
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
                                <Form onSubmit={handleChangePassword} ref={form}>
                                    {message && (
                                        <div className="form-group">
                                            <div className={successful ? "alert alert-success custom-alert" : "alert alert-danger custom-alert"} role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="oldPassword">Old Password</label>
                                                    <Input
                                                        type="password"
                                                        name="oldPassword"
                                                        className="form-control"
                                                        placeholder="Enter Old Password"
                                                        value={fields.oldPassword}
                                                        validations={[required, vpassword]}
                                                        onChange={handleChange}
                                                        disabled={isFetching}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="newPassword">New Password</label>
                                                    <Input
                                                        type="password"
                                                        name="newPassword"
                                                        className="form-control"
                                                        placeholder="Enter New Password"
                                                        value={fields.newPassword}
                                                        onChange={handleChange}
                                                        validations={[required, vpassword]}
                                                        disabled={isFetching}
                                                        ref={newPassword}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-3"></div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="conPassword">Confirm Password</label>
                                                    <Input
                                                        type="password"
                                                        name="conPassword"
                                                        className="form-control"
                                                        placeholder="Enter Confirm Password"
                                                        value={fields.conPassword}
                                                        onChange={handleChange}
                                                        validations={[required, vpassword, validateConfirmPassword]}
                                                        disabled={isFetching}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-3"></div>
                                        </div>

                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-primary" disabled={loading}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Change Password</span>
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

export default ChangePassword;
