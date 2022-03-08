import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate, useParams } from 'react-router-dom'
import { clearMessage } from "../../redux/actions/message";
import { importReport } from "../../redux/actions/reports";

const ImportReports = ({ match }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [fields, setFields] = useState({
        importFile: ''
    })

    useEffect(() => {
        dispatch(clearMessage())
        return () => {
            dispatch(clearMessage())
        }

    }, [])

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);

    const handleImportReport = (e) => {
        e.preventDefault();

        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);
            //For image upload use formdata code start
            const formData = new FormData();
            formData.append('importFile', fields.importFile);
            //For image upload use formdata code end

            dispatch(importReport(formData))
                .then(() => {
                    setLoading(false);
                    setSuccessful(true);
                    setFields({
                        importFile: ''
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


    const handleFile = event => {
        const value = event.target.files[0]
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
                            <h1>Import Reports</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Import Reports</li>
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
                                <Form onSubmit={handleImportReport} ref={form}>
                                    {message && (
                                        <div className="form-group">
                                            <div className={successful ? "alert alert-success custom-alert" : "alert alert-danger custom-alert"} role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group" style={{marginLeft: "45%"}}>
                                                    <label htmlFor="lastName">Import Reports</label>
                                                    <Input
                                                        type="file"
                                                        accept=".mdb"
                                                        name="importFile"
                                                        className="form-group"
                                                        onChange={handleFile}
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
                                            <span>Submit</span>
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

export default ImportReports;
