import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRoles, changeRoleStatus } from "../../redux/actions/roles";
import DataTable from "react-data-table-component";
import { clearMessage } from "../../redux/actions/message";

const Roles = () => {
    const dispatch = useDispatch();
    const { roles, isFetching } = useSelector(state => state.roles);
    const [roleStatus, setRoleStatus] = useState({})
    const [isChangingStatus, setChangeStatus] = useState(false)

    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);

    const handleStatusChange = (event, id) => {
        setChangeStatus(true)

        dispatch(changeRoleStatus(id)).then(() => {
            setTimeout(() => {
                setChangeStatus(false)
                dispatch(getAllRoles())

            }, 1000);
            setSuccessful(true);
        })
            .catch(() => {

                setChangeStatus(false)
                setSuccessful(false);
            })
    }

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => (row.status === 1) ? 'Active' : 'Inactive',
            sortable: true
        },
        {
            name: "Edit",
            cell: (row) => (
                // <Link to="#" className="nav-link">
                //     <i className="nav-icon fas fa-users"></i>
                //     <p>
                //         Users
                //         <i className="right fas fa-angle-left"></i>
                //     </p>
                // </Link>

                <Link to={`/roles/edit/${row.id}`} className="btn btn-info">
                    <i className="right fas fa-edit"></i>
                </Link>
            )
        },
        {
            name: "Change Status",
            cell: (row) => (
                <div className="form-group">
                    <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                        <input type="checkbox" className="custom-control-input" onChange={(event) => handleStatusChange(event, row.id)} checked={roleStatus[row.id] == '1'} id={`customerSwitch${row.id}`} disabled={isChangingStatus} />
                        <label className="custom-control-label" htmlFor={`customerSwitch${row.id}`}></label>
                    </div>
                </div>
            )
        },
        //   {
        //     cell: () => (
        //         <button
        //             type="button"
        //         >
        //         Delete
        //       </button>
        //     )
        //   }
    ];

    useEffect(() => {
        dispatch(getAllRoles())
        return () => {
            dispatch(clearMessage())
        }
    }, [])

    useEffect(() => {
        const roleDetails = {}
        roles.forEach(role => {
            roleDetails[role.id] = role.status
        })
        setRoleStatus(roleDetails)
    }, [roles])

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
                <Link to='/roles/add' className="btn btn-primary create-user"><i className="right fas fa-plus-circle"></i> Create Role</Link>
                <div className="custom-data-table">
                    <DataTable
                        title="Roles"
                        columns={columns}
                        data={roles}
                        defaultSortFieldID={1}
                        pagination
                        progressPending={isFetching}
                    />
                </div>
            </div>
        </div>
    );
};

export default Roles;
