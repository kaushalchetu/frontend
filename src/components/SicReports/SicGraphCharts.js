import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sicGraphCharts } from "../../redux/actions/sicReports";
import { sicGraphSelector } from "../../redux/selectors/sicGraphSelector";
import "react-data-table-component-extensions/dist/index.css";

const SicGraphCharts = () => {

    const dispatch = useDispatch();

    const data = useSelector((state) =>
        sicGraphSelector(state.sicReports.sicGraphCharts)
    )

    useEffect(() => {
        dispatch(sicGraphCharts())
    }, [])

    return (
        <div className="main-content">
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
                                            <tr>
                                                <td className="p-0"></td>
                                                {data?.ci.map((value, index) => (
                                                    <td className="p-0" key={index}>
                                                        <div className="para-years">
                                                            {value.name}
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
                                                {data?.ci.map((label, index) => (
                                                    <td key={index} style={{ backgroundColor: label.color }}>
                                                        <div className="color-bg" ></div>
                                                    </td>

                                                ))}
                                            </tr>
                                            <tr className="border-td">
                                                <td>
                                                    <div>
                                                        CD
                                                    </div>
                                                </td>
                                                {data?.ci.map((label, index) => (
                                                    <td key={index} style={{ backgroundColor: data?.cd[index]?.color }}>
                                                        <div className="color-bg" ></div>
                                                    </td>
                                                ))}
                                            </tr>
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
    );
};

export default SicGraphCharts;
