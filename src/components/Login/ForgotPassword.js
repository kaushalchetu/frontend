import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { forgotPassword, login } from "../../redux/actions/auth";

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
}
//Validations code end

const ForgotPassword = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useRef();
    const checkBtn = useRef();
    const [loading, setLoading] = useState(false);

    const [fields, setFields] = useState({
        email: '',
    })
    const [successful, setSuccessful] = useState(false);

    const handleForgotPassword = (e) => {
        e.preventDefault();

        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(forgotPassword(fields))
                .then(() => {
                    setLoading(false);
                    setSuccessful(true);
                    setFields({
                        email: ''
                    })
                    // navigate("/");
                })
                .catch(() => {
                    setSuccessful(false);
                    setLoading(false);
                });
        } else {
            setLoading(false);
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
                                <h3 className="mb-0">SISTEMA DE GESTI??N DE MANTENIMIENTO</h3>
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
                            <h2>Forgot Your Password?</h2>
                            <p>To reset your password, enter the registered e-mail address and we will send you a password reset link on your e-mail.</p>
                        </div>
                        <Form onSubmit={handleForgotPassword} ref={form} className="login__form">
                            <div className="txt_field pb-4">
                                <div className="txt_field__relative-item">
                                    <Input
                                        type="text"
                                        className="my-input email"
                                        name="email"
                                        placeholder="Username"
                                        value={fields.email}
                                        onChange={handleChange}
                                        validations={[required, validEmail]}
                                        autoFocus="autofocus"
                                    />
                                    <div className="txt_field__relative-item--absolute-mail">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24">
                                            <path id="Icon_material-email" data-name="Icon material-email" d="M30,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V9A3.009,3.009,0,0,0,30,6Zm0,6L18,19.5,6,12V9l12,7.5L30,9Z" transform="translate(-3 -6)" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="txt_field">
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
                                </div>
                            </div> */}
                            {/* <div className="d-flex justify-content-between align-items-center pb-3 pt-3">
                                <div>
                                    <div className="login__round">
                                        <input type="checkbox" defaultChecked id="checkbox" />
                                        <label htmlFor="checkbox"></label>
                                        <span>Remember</span>
                                    </div>
                                </div>
                                <div className="login__pass">
                                    <Link to="/forgot/password" className="login__pass">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div> */}
                            <div>
                                <button className="login__btn-my" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Send Confirmation</button>
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

export default ForgotPassword;
