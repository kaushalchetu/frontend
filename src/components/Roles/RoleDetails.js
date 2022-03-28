import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useParams, useNavigate } from 'react-router-dom'
import { createRole, getRole, clearRole, updateRole } from "../../redux/actions/roles";

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

const vname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="error text-danger" role="alert">
                The name must be between 2 and 20 characters.
            </div>
        );
    }
};
//Validations code end

const RoleDetails = ({ match }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();

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
                            // toast.success("wow it easy")
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
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Create Role</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Create Role</li>
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
                                <Form onSubmit={handleRole} ref={form}>
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-6">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="name">Role Name</label>
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
                                        </div>
                                        <div className="col-sm-3"></div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-primary" disabled={loading}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>{id ? 'Update Role' : 'Create Role'}</span>
                                        </button>
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

export default RoleDetails;
