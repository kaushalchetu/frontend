import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import queryString from 'query-string';
import { useHistory, useParams, useNavigate } from 'react-router-dom'
import { createRole, getRole, clearRole, updateRole } from "../../redux/actions/roles";
import { clearMessage } from "../../redux/actions/message";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 2 and 20 characters.
            </div>
        );
    }
};

const RoleDetails = ({ match }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    //const history = useHistory();
    const navigate = useNavigate();

    const { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();

    const { message } = useSelector(state => state.message);
    const { isFetching, role } = useSelector(state => state.roles);

    const [fields, setFields] = useState({
        name: ''
    })

    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getRole(id))
            return () => {
                dispatch(clearRole())
            }
        }

        return () => {
            dispatch(clearMessage())
        }
    }, [])

    useEffect(() => {
        if (role && id) {
            setFields({
                ...fields,
                name: role.name
            })
        }
        else {
            setFields({
                name: ''
            })
        }
    }, [role])

    const handleRole = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);

            if (id) {
                dispatch(updateRole(id, fields))
                    .then(() => {
                        setSuccessful(true);
                        setLoading(false);

                        setTimeout(() => {
                            //history.push("/roles");
                            navigate("/roles");
                        }, 1000);
                    })
                    .catch(() => {
                        setSuccessful(false);
                        setLoading(false);
                    });
            } else {
                dispatch(createRole(fields))
                    .then(() => {
                        setSuccessful(true);
                        setLoading(false);

                        setTimeout(() => {
                            //history.push("/roles");
                            navigate("/roles");
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
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Add Role</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Add Role</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary">
                                <Form onSubmit={handleRole} ref={form}>
                                    {message && (
                                        <div className="form-group">
                                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="name">Role Name</label>
                                            <Input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Role Name"
                                                value={fields.name}
                                                onChange={handleChange}
                                                validations={[required, vname]}
                                            />
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button className="btn btn-primary" disabled={loading}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>{id ? 'Update' : 'Add'}</span>
                                        </button>
                                    </div>
                                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                </Form>
                            </div>
                        </div>
                        <div class="col-md-6"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoleDetails;
