import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRoles } from "../../redux/actions/roles";
import DataTable from "react-data-table-component";

const Roles = () => {
    const dispatch = useDispatch();
    const { roles, isFetching } = useSelector(state => state.roles);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => (row.status===1) ? 'Active' : 'Inactive',
            sortable: true
        },
        {
            cell: (row) => (
                <Link to={`/roles/edit/${row.id}`} className="navbar-brand">
                    Edit
                </Link>
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
    }, [])



    return (
        <div className="col-md-12">
            {isFetching ? (
                <span className="spinner-border"></span>
            ) : (
                <Fragment>
                    <Link to='/roles/add' className="nav-link">Add Role</Link>
                    <DataTable
                        title="Roles"
                        columns={columns}
                        data={roles}
                        defaultSortFieldID={1}
                        pagination
                    />
                </Fragment>
            )}

        </div>
    );
};

export default Roles;
