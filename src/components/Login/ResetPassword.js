import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { resetPassword, login } from "../../redux/actions/auth";
import { logout } from "../../redux/actions/auth";

const ResetPassword = (props) => {

    const newPassword = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();

    const [fields, setFields] = useState({
        newPassword: '',
        conPassword: '',
    })
    const [successful, setSuccessful] = useState(false);

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

    const handleResetPassword = (e) => {
        e.preventDefault();

        setSuccessful(false)

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);

            if (id) {
                dispatch(resetPassword(id, fields))
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
        <div className="login container-fluid">
            <div className="row login__height-100">
                <div className="col-md-8 px-0 col-12-sm hide-mobile login__bg-left">
                    <div className="login__bg-effect">
                        <div className="login__logo pt-5">
                            <img
                                src="/images/logo.png"
                                alt="login-logo"
                            />
                        </div>
                        <div className="login__relative-sec">
                            <div className="login__relative-sec--bg-text">
                                <h3 className="mb-0">SISTEMA DE GESTIÓN DE MANTENIMIENTO</h3>
                                <h3>AUTOPISTAS DEL NORTE</h3>
                            </div>
                        </div>
                        <div className="">
                        </div>
                    </div>
                </div>
                <div className="col-md-4 login__right-pad3">
                    <div className="login__right-pad3--my-form">
                        <div className="pb-1">
                            <h2>Create New Password</h2>
                            <p>Enter your new password below.</p>
                        </div>
                        <Form onSubmit={handleResetPassword} ref={form} className="login__form">
                            <div className="txt_field pb-4">
                                <div className="txt_field__relative-item">
                                    <Input
                                        type="password"
                                        className="my-input password"
                                        placeholder="Enter New Password"
                                        name="newPassword"
                                        value={fields.newPassword}
                                        onChange={handleChange}
                                        validations={[required, vpassword]}
                                        disabled={isFetching}
                                        ref={newPassword}
                                        autoFocus="autofocus"
                                    />
                                    <div className="txt_field__relative-item--absolute-mail txt_field__relative-item--lock-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.769" height="33.822" viewBox="0 0 25.769 33.822">
                                            <path id="Icon_material-lock" data-name="Icon material-lock" d="M28.548,12.774H26.938V9.553a8.053,8.053,0,0,0-16.106,0v3.221H9.221A3.231,3.231,0,0,0,6,16V32.1a3.231,3.231,0,0,0,3.221,3.221H28.548A3.231,3.231,0,0,0,31.769,32.1V16A3.231,3.231,0,0,0,28.548,12.774Zm-9.664,14.5a3.221,3.221,0,1,1,3.221-3.221A3.231,3.231,0,0,1,18.885,27.269Zm4.993-14.5H13.892V9.553a4.993,4.993,0,0,1,9.986,0Z" transform="translate(-6 -1.5)" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="txt_field pb-4">
                                <div className="txt_field__relative-item">
                                    <Input
                                        type="password"
                                        className="my-input password"
                                        placeholder="Enter Confirm Password"
                                        name="conPassword"
                                        value={fields.conPassword}
                                        onChange={handleChange}
                                        validations={[required, vpassword, validateConfirmPassword]}
                                        disabled={isFetching}
                                    />
                                    <div className="txt_field__relative-item--absolute-mail txt_field__relative-item--lock-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.769" height="33.822" viewBox="0 0 25.769 33.822">
                                            <path id="Icon_material-lock" data-name="Icon material-lock" d="M28.548,12.774H26.938V9.553a8.053,8.053,0,0,0-16.106,0v3.221H9.221A3.231,3.231,0,0,0,6,16V32.1a3.231,3.231,0,0,0,3.221,3.221H28.548A3.231,3.231,0,0,0,31.769,32.1V16A3.231,3.231,0,0,0,28.548,12.774Zm-9.664,14.5a3.221,3.221,0,1,1,3.221-3.221A3.231,3.231,0,0,1,18.885,27.269Zm4.993-14.5H13.892V9.553a4.993,4.993,0,0,1,9.986,0Z" transform="translate(-6 -1.5)" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="login__btn-my" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Reset Password</button>
                            </div>
                            {/* <div className="login__d-register">
                                <p><a>Not a member yet ?</a> </p>
                            </div>
                            <div>
                                <button className="login__btn-my login__create-account">Create Account</button>
                            </div> */}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
