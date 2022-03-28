import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { getRundataReportsData, importRundataReports } from "../../redux/actions/rundataReports";
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

const ImportRundataReports = ({ match }) => {

    const { rundataReportsData, isFetching } = useSelector(state => state.rundataReports);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();

    const [fields, setFields] = useState({
        fileName: '',
        importFileName: ''
    })

    useEffect(() => {
        dispatch(getRundataReportsData())
    }, [])

    const [successful, setSuccessful] = useState(false);

    const handleImportRundataReports = (e) => {
        e.preventDefault();

        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(true);
            //For image upload use formdata code start
            const formData = new FormData();
            formData.append('fileName', fields.fileName);
            formData.append('importFileName', fields.importFileName);
            //For image upload use formdata code end

            dispatch(importRundataReports(formData))
                .then(() => {
                    setLoading(false);
                    setSuccessful(true);
                    dispatch(getRundataReportsData())
                    setFields({
                        fileName: '',
                        importFileName: ''
                    })
                    //window.location.reload();
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
            name: "Imported By (User Name)",
            selector: (row) => row.imported_by,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: false,
        },
        {
            name: "File Name",
            selector: (row) => row.file_name,
            sortable: false,
        },
        {
            name: "Created Date",
            selector: (row) => moment(row.created_at).format('llll'),
            sortable: true
        },
        {
            name: "Imported File Name",
            cell: (row) => (
                <a href={`${BASE_URL}/hdmdatabase/` + row.imported_filename} className="btn btn-info btn-sm" download>
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
                            <h1>RunData Reports Section</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">RunData Reports Section</li>
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
                                <Form onSubmit={handleImportRundataReports} ref={form}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">File Name</label>
                                                    <Input
                                                        type="text"
                                                        name="fileName"
                                                        className="form-control"
                                                        placeholder="Enter File Name"
                                                        disabled={isFetching}
                                                        validations={[required]}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Import File</label>
                                                    <Input
                                                        type="file"
                                                        accept=".mdb"
                                                        name="importFileName"
                                                        className="form-control"
                                                        disabled={isFetching}
                                                        validations={[required]}
                                                        onChange={handleFile}
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
                                            <span>Import</span>
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
                                    data={rundataReports}
                                > */}
                                <DataTable
                                    title="Imported Report Lists"
                                    columns={columns}
                                    data={rundataReportsData}
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

export default ImportRundataReports;
