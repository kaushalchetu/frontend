import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from 'react-router-dom';

import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../redux/actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    // props.history.push("/");
                    // window.location.reload();
                    navigate("/");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="login container-fluid">
            <div className="row login__height-100">
                <div className="col-md-8 px-0 col-12-sm hide-mobile login__bg-left">
                    <div className="login__bg-effect">
                        <div className="login__logo pt-5">
                            <img
                                src="images/logo.png"
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
                        <div className="login__right-pad3--logo-head">
                            <img
                                src="images/logo.png"
                                alt="login-logo"
                            />
                        </div>
                        <div className="pb-1">
                            <h2>Get Started</h2>
                            <p>Welcome back login with your data that you entered during registration.</p>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <Form onSubmit={handleLogin} ref={form} className="login__form">
                            <div className="txt_field pb-4">
                                <div className="txt_field__relative-item">
                                    <Input
                                        type="text"
                                        className="my-input email"
                                        name="email"
                                        placeholder="Username"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required]}
                                    />
                                    <div className="txt_field__relative-item--absolute-mail">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24">
                                            <path id="Icon_material-email" data-name="Icon material-email" d="M30,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V9A3.009,3.009,0,0,0,30,6Zm0,6L18,19.5,6,12V9l12,7.5L30,9Z" transform="translate(-3 -6)" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="txt_field">
                                <div className="txt_field__relative-item">
                                    <Input
                                        type="password"
                                        className="my-input password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                    <div className="txt_field__relative-item--absolute-mail txt_field__relative-item--lock-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.769" height="33.822" viewBox="0 0 25.769 33.822">
                                            <path id="Icon_material-lock" data-name="Icon material-lock" d="M28.548,12.774H26.938V9.553a8.053,8.053,0,0,0-16.106,0v3.221H9.221A3.231,3.231,0,0,0,6,16V32.1a3.231,3.231,0,0,0,3.221,3.221H28.548A3.231,3.231,0,0,0,31.769,32.1V16A3.231,3.231,0,0,0,28.548,12.774Zm-9.664,14.5a3.221,3.221,0,1,1,3.221-3.221A3.231,3.231,0,0,1,18.885,27.269Zm4.993-14.5H13.892V9.553a4.993,4.993,0,0,1,9.986,0Z" transform="translate(-6 -1.5)" />
                                        </svg>
                                    </div>
                                    <div className="txt_field__relative-item--absolute-eye">
                                        <svg id="eye" xmlns="http://www.w3.org/2000/svg" width="30.066" height="21.14" viewBox="0 0 30.066 21.14">
                                            <g id="Group_5" data-name="Group 5" transform="translate(10.922 10.57)">
                                                <g id="Group_4" data-name="Group 4">
                                                    <path id="Path_92" data-name="Path 92" d="M187,256.17a.587.587,0,1,0,0,.83A.587.587,0,0,0,187,256.17Z" transform="translate(-185.997 -255.997)" />
                                                </g>
                                            </g>
                                            <g id="Group_7" data-name="Group 7" transform="translate(13.271 11.745)">
                                                <g id="Group_6" data-name="Group 6" transform="translate(0 0)">
                                                    <path id="Path_93" data-name="Path 93" d="M227.762,276a1.762,1.762,0,1,0,1.762,1.762A1.764,1.764,0,0,0,227.762,276Zm0,2.349a.587.587,0,1,1,.587-.587A.588.588,0,0,1,227.762,278.349Z" transform="translate(-226 -276)" />
                                                </g>
                                            </g>
                                            <g id="Group_9" data-name="Group 9" transform="translate(10.335 8.808)">
                                                <g id="Group_8" data-name="Group 8" transform="translate(0 0)">
                                                    <path id="Path_94" data-name="Path 94" d="M180.7,226a4.659,4.659,0,0,0-1.886.394.587.587,0,0,0,.473,1.075,3.491,3.491,0,0,1,1.414-.3,3.523,3.523,0,1,1-3.523,3.523c0-.02,0-.04,0-.06a.587.587,0,0,0-1.174-.027c0,.029,0,.058,0,.087a4.7,4.7,0,1,0,4.7-4.7Z" transform="translate(-176 -226)" />
                                                </g>
                                            </g>
                                            <g id="Group_11" data-name="Group 11" transform="translate(14.446 0)">
                                                <g id="Group_10" data-name="Group 10" transform="translate(0 0)">
                                                    <path id="Path_95" data-name="Path 95" d="M246.587,76a.587.587,0,0,0-.587.587v3.523a.587.587,0,0,0,1.174,0V76.587A.587.587,0,0,0,246.587,76Z" transform="translate(-246 -76)" />
                                                </g>
                                            </g>
                                            <g id="Group_13" data-name="Group 13" transform="translate(4.979 1.691)">
                                                <g id="Group_12" data-name="Group 12" transform="translate(0 0)">
                                                    <path id="Path_96" data-name="Path 96" d="M88.283,107.452l-2.491-2.491a.587.587,0,0,0-.831.831l2.491,2.491a.587.587,0,1,0,.831-.831Z" transform="translate(-84.789 -104.789)" />
                                                </g>
                                            </g>
                                            <g id="Group_15" data-name="Group 15" transform="translate(21.422 1.691)">
                                                <g id="Group_14" data-name="Group 14" transform="translate(0 0)">
                                                    <path id="Path_97" data-name="Path 97" d="M368.284,104.961a.587.587,0,0,0-.831,0l-2.491,2.491a.587.587,0,0,0,.831.831l2.491-2.491A.587.587,0,0,0,368.284,104.961Z" transform="translate(-364.79 -104.789)" />
                                                </g>
                                            </g>
                                            <g id="Group_17" data-name="Group 17" transform="translate(0 5.872)">
                                                <g id="Group_16" data-name="Group 16" transform="translate(0 0)">
                                                    <path id="Path_98" data-name="Path 98" d="M29.919,183.734C26.189,179.511,20.65,176,15.033,176S3.877,179.512.147,183.734a.587.587,0,0,0,.88.778c.125-.142.253-.283.383-.423a16.514,16.514,0,0,0,27.245,0c.13.14.258.282.383.423a.587.587,0,0,0,.88-.778Zm-14.886,6.359A15.312,15.312,0,0,1,2.25,183.224c2.092-2.05,6.926-6.05,12.783-6.05s10.691,4,12.783,6.05A15.312,15.312,0,0,1,15.033,190.094Z" transform="translate(0 -176)" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pb-3 pt-3">
                                <div>
                                    <div className="login__round">
                                        <input type="checkbox" defaultChecked id="checkbox" />
                                        <label htmlFor="checkbox"></label>
                                        <span>Remember</span>
                                    </div>
                                </div>
                                <div className="login__pass">Forgot Password?</div>
                            </div>
                            <div>
                                <button className="login__btn-my" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Sign in</button>
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

export default Login;
