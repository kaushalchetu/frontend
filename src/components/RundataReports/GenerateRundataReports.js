import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRundataReports } from "../../redux/actions/rundataReports";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { reportSelector, headerSelector, footerSelector } from "../../redux/selectors/reportSelectors";
import "react-data-table-component-extensions/dist/index.css";

const GenerateRundataReports = () => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const data = useSelector((state) =>
        reportSelector(state.rundataReports.rundataReports)
    )

    const headers = useSelector((state) =>
        headerSelector(state.rundataReports.rundataReports)
    )

    const footer = useSelector((state) =>
        footerSelector(state.rundataReports.rundataReports)
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
        dispatch(generateRundataReports())
    }, [])

    return (

        <div className="main-content">
            <div className="col-md-12">
                <button onClick={() => setShow(prev => !prev)} className="btn btn-primary" style={{ marginLeft: '45%' }}><i className="right fas fa-file"></i> Generate RunData Reports</button>
                <div className="custom-data-table">
                    {show &&
                        (
                            <DataTableExtensions
                                columns={columns}
                                data={data.concat(footer)}
                                exportHeaders
                            >
                                <DataTable
                                    title="RunData Reports"
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

export default GenerateRundataReports;
