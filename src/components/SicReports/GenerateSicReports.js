import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSicReports } from "../../redux/actions/sicReports";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { reportSelector, headerSelector, footerSelector } from "../../redux/selectors/reportSelectors";
import "react-data-table-component-extensions/dist/index.css";

const GenerateSicReports = () => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const data = useSelector((state) =>
        reportSelector(state.sicReports.sicReports)
    )

    const headers = useSelector((state) =>
        headerSelector(state.sicReports.sicReports)
    )

    const footer = useSelector((state) =>
        footerSelector(state.sicReports.sicReports)
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
        dispatch(generateSicReports())
    }, [])

    return (

        <div className="main-content">
            <div className="col-md-12">
                <button onClick={() => setShow(prev => !prev)} className="btn btn-primary" style={{ marginLeft: '45%' }}><i className="right fas fa-file"></i> Generate SIC Reports</button>
                <div className="custom-data-table">
                    {show &&
                        (
                            <DataTableExtensions
                                columns={columns}
                                //data={data.concat(footer)}
                                exportHeaders
                            >
                                <DataTable
                                    title="SIC Reports"
                                    columns={columns}
                                    //data={data.concat(footer)}
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

export default GenerateSicReports;
