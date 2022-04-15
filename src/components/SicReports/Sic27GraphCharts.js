import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sic27GraphCharts } from "../../redux/actions/sicReports";
import { sic27GraphSelector } from "../../redux/selectors/sic27GraphSelector";
import "react-data-table-component-extensions/dist/index.css";

const Sic27GraphCharts = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) =>
        sic27GraphSelector(state.sicReports.sic27GraphCharts)
    )

    useEffect(() => {
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
                                                                <tr>
                                                                    <td>
                                                                        <table className="w-100">
                                                                            <tr>
                                                                                <td className="pt-3"></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                    </tbody>
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

export default Sic27GraphCharts;
