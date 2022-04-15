import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import { sic27GraphCharts, getSicGraphChart } from "../../redux/actions/sicReports";
import { sic27GraphSelector } from "../../redux/selectors/sic27GraphSelector";
import { sicSelector } from "../../redux/selectors/sicGraphSelector";
import "react-data-table-component-extensions/dist/index.css";
import { getAllSicsOptions } from "../../redux/actions/sicReports";

const SicGraphCharts = () => {
    const { sicOptions, isFetching, sicGraphType } = useSelector(state => state.sicReports);
    const [fields, setFields] = useState({
        sheetType: '',
    })
    const handleChange = event => {
        dispatch(getSicGraphChart(event.target.value))
    }

    const dispatch = useDispatch();
    const data = useSelector((state) =>
        sic27GraphSelector(state.sicReports.sic27GraphCharts)
    )

    const testData = useSelector((state) =>
        sicSelector(state.sicReports.sicGraphCharts)
    )

    useEffect(() => {
        dispatch(getAllSicsOptions())
        dispatch(sic27GraphCharts())
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>SIC27 Graph Charts</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">SIC27 Graph Charts</li>
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
                                <Form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="sheetType">Select SIC Series</label>
                                                    <Select
                                                        className="form-control"
                                                        name="sheetType"
                                                        value={sicGraphType}
                                                        onChange={handleChange}
                                                        disabled={isFetching}
                                                    >
                                                        <option value='' disabled>Select Series</option>
                                                        {sicOptions.map(option => (
                                                            <option key={`${option.sheet_type}`} value={option.sheet_type}>{option.sheet_list}</option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-table">
                                <table className="w-100 table-subtramo">
                                    <tbody>
                                        <tr className="first-heading">
                                            <td>
                                                <div className="main-heading">
                                                    <h4>SUBTRAMO 1: PATIVILCA - HUARME</h4>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="main-wrapper table-responsive">
                                <table className="w-100 table-subtramo ml-1">
                                    <tbody>
                                        <tr>
                                            <td className="p-0">
                                                <table className="w-100 table-subtramo">
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-0">
                                                                <div className="paragraph">
                                                                    <p className="mb-0">PATIVILCA</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-0">
                                                <table className="w-100 table-subtramo">
                                                    <tbody>
                                                        <tr>
                                                            <td className="pt-3"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-0">
                                                <table className="w-100 table-subtramo table-years-custom">
                                                    <tbody>
                                                        {data?.chunks.map((chunk, index) => (
                                                            <Fragment>
                                                                <tr key={index}>
                                                                    <td className="p-0"></td>
                                                                    {chunk.map((value, i) => (
                                                                        <td className="p-0" key={i}>
                                                                            <div className="para-years">
                                                                                {data?.ci[value].name}
                                                                            </div>
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                                <tr className="border-td">
                                                                    <td>
                                                                        <div>
                                                                            CI
                                                                        </div>
                                                                    </td>
                                                                    {index === 0 && (
                                                                        <td colSpan="14" rowSpan="2" >
                                                                            <div className="flex-first">
                                                                                <span>
                                                                                    <div>DEFLEXIONES</div>
                                                                                    <div>DETALLADAS</div>
                                                                                </span>
                                                                                <span>
                                                                                    <div>N - S </div>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )}                                                                   
                                                                    {chunk.map((value, i) => (
                                                                        <React.Fragment key={i}>
                                                                            {!data?.ci[value].spanCell ? (
                                                                                <td style={{ backgroundColor: data?.ci[value].color }}>
                                                                                    <div className="color-bg" ></div>
                                                                                </td>
                                                                            ) : null}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </tr>
                                                                <tr className="border-td">
                                                                    <td>
                                                                        <div>
                                                                            CD
                                                                        </div>
                                                                    </td>
                                                                    {chunk.map((value, i) => (
                                                                        <React.Fragment key={i}>
                                                                            {!data?.ci[value].spanCell ? (
                                                                                <td style={{ backgroundColor: data?.cd[value].color }}>
                                                                                    <div className="color-bg" ></div>
                                                                                </td>
                                                                            ) : null}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="w-100">
                                                    <tr>
                                                        <td className="pt-3"></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SicGraphCharts;
