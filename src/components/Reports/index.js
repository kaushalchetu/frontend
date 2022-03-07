import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displayReport } from "../../redux/actions/reports";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { clearMessage } from "../../redux/actions/message";
import { reportSelector, headerSelector, footerSelector } from "../../redux/selectors/reportSelectors";
import "react-data-table-component-extensions/dist/index.css";

const Reports = () => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);

    const data = useSelector((state) =>
        reportSelector(state.reports.reports)
    )

    const headers = useSelector((state) =>
        headerSelector(state.reports.reports)
    )

    const footer = useSelector((state) =>
        footerSelector(state.reports.reports)
    )

    const columns = headers.map(header => ({
        name: header.label,
        cell: (row) => (
            <span style={{ fontWeight: row.footer ? 'bold' : '' }}>
                {row[header.name] ? row[header.name] : 'Totales Generales'}
            </span>
        ),
        sortable: true,
    }))

    useEffect(() => {
        dispatch(displayReport())
        return () => {
            dispatch(clearMessage())
        }
    }, [])

    return (

        <div className="main-content">
            <div className="col-md-12">
                {message && (
                    <div className="form-group">
                        <div className={successful ? "alert alert-success custom-alert" : "alert alert-danger custom-alert"} role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <button onClick={() => setShow(prev => !prev)} className="btn btn-primary" style={{ marginLeft: '45%' }}><i className="right fas fa-file"></i> Generate Report</button>
                <div className="custom-data-table">
                    {show &&
                        (
                            <DataTableExtensions
                                columns={columns}
                                data={data.concat(footer)}
                                exportHeaders
                            >
                                <DataTable
                                    title="Reports"
                                    columns={columns}
                                    data={data.concat(footer)}
                                    defaultSortFieldID={1}
                                    pagination
                                //progressPending={isFetching}
                                //highlightOnHover
                                />
                            </DataTableExtensions>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Reports;
