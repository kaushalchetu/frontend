import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { clearMessage } from "../../redux/actions/message";
import { getAllSicsOptions, getSicReportsData, importSicReports } from "../../redux/actions/sicReports";
import DataTable from "react-data-table-component";
import { BASE_URL } from "../../helpers/Constant";   //for multiple import
// import BASE_URL from "../../helpers/Constant";   //for single import
import moment from "moment";


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
//Validations code end

const ImportSicReports = ({ match }) => {

    const { sicOptions, sicReportsData, isFetching } = useSelector(state => state.sicReports);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [fields, setFields] = useState({
        sheetType: '',
        sheetName: ''
    })

    useEffect(() => {
        dispatch(clearMessage())
        dispatch(getAllSicsOptions())
        dispatch(getSicReportsData())
        return () => {
            dispatch(clearMessage())
        }

    }, [])

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);

    const handleImportSicReports = (e) => {
        e.preventDefault();

        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);
            //For image upload use formdata code start
            const formData = new FormData();
            formData.append('sheetType', fields.sheetType);
            formData.append('sheetName', fields.sheetName);
            //For image upload use formdata code end

            dispatch(importSicReports(formData))
                .then(() => {
                    setLoading(false);
                    setSuccessful(true);
                    dispatch(getSicReportsData())
                    setFields({
                        sheetType: '',
                        sheetName: ''
                    })
                    window.location.reload();
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

    const handleChange = event => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
    }

    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
        },
        {
            name: "Imported By (Username)",
            selector: (row) => row.imported_by,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: false,
        },
        {
            name: "Filename",
            selector: (row) => row.file_name,
            sortable: false,
        },
        {
            name: "Created Date",
            selector: (row) => moment(row.created_at).format('llll'),
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <a href={`${BASE_URL}/hdmdatabase/` + row.imported_filename} className="btn btn-info" download>
                    <i className="right fas fa-download"></i> Download File
                </a>
            )
        },
    ];

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Import SIC Reports</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Import SIC Reports</li>
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
                                <Form onSubmit={handleImportSicReports} ref={form}>
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
                                                    <label htmlFor="sheetType">Select SIC Report Series</label>
                                                    <Select
                                                        className="form-control"
                                                        name="sheetType"
                                                        value={fields.sheetType}
                                                        validations={[required]}
                                                        onChange={handleChange}
                                                        disabled={isFetching}>
                                                        <option value="" disabled>Select Series</option>
                                                        {sicOptions.map(option => (
                                                            <option key={`${option.sheet_type}`} value={option.sheet_type}>{option.sheet_list}</option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Import SIC Reports</label>
                                                    <Input
                                                        type="file"
                                                        accept=".xlsx"
                                                        name="sheetName"
                                                        className="form-control"
                                                        onChange={handleFile}
                                                        validations={[required]}
                                                        disabled={isFetching}
                                                        style={{ paddingTop: "3px" }}
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

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-data-table">
                                {/* <DataTableExtensions
                                    columns={columns}
                                    data={sicReports}
                                > */}
                                <DataTable
                                    title="SIC Reports Data"
                                    columns={columns}
                                    data={sicReportsData}
                                    defaultSortFieldID={1}
                                    pagination
                                    progressPending={isFetching}
                                // customStyles={customStyles}
                                />
                                {/* </DataTableExtensions> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ImportSicReports;
