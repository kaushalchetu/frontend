import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, getAllRolesOptions, deleteUser } from "../../redux/actions/users";
import DataTable from "react-data-table-component";

const Users = () => {
  const dispatch = useDispatch();
  const { users, roleOptions, isFetching } = useSelector(state => state.users);

  const handleDelete = id => {
    dispatch(deleteUser(id))
      .then(() => {
        dispatch(getAllUsers())
        dispatch(getAllRolesOptions())
      })
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true
    },
    {
      name: "Role",
      selector: (row) => {
        const role = roleOptions.find(role => role.id === row.role_id)
        return role ? role.name : ''
      },
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Phone",
      selector: (row) => row.phone_no,
      sortable: false,
    },
    {
      cell: (row) => (
        <Link to={`/users/edit/${row.id}`} className="navbar-brand">
          Edit
        </Link>
      )
    },
    {
      cell: (row) => (
        <button
          type="button"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      )
    }
  ];

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllRolesOptions())
  }, [])

  return (
    <div className="col-md-12">
      {isFetching ? (
        <span className="spinner-border"></span>
      ) : (
        <Fragment>
          <Link to='/users/add' className="nav-link">Add User</Link>
          <DataTable
            title="Users"
            columns={columns}
            data={users}
            defaultSortFieldID={1}
            pagination
          />
        </Fragment>
      )}

    </div>
  );
};

export default Users;
