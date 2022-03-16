import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, getAllRolesOptions, deleteUser, changeUserStatus } from "../../redux/actions/users";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
//import "react-data-table-component-extensions/dist/index.css";
import { clearMessage } from "../../redux/actions/message";
import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import classNames from "classnames";

const Users = () => {
  const dispatch = useDispatch();
  const { users, roleOptions, isFetching } = useSelector(state => state.users);

  const [userStatus, setUserStatus] = useState({})
  const [isChangingStatus, setChangeStatus] = useState(false)

  const { message } = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);

  const handleStatusChange = (event, id) => {

    setChangeStatus(true);
    //setSuccessful(false);

    dispatch(changeUserStatus(id)).then(() => {
      setTimeout(() => {
        setChangeStatus(false)
        dispatch(getAllUsers())
      }, 1000);
      setSuccessful(true);
    })
      .catch(() => {
        setChangeStatus(false);
        setSuccessful(false);
      })
  }

  const handleDelete = id => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id))
          .then(() => {
            dispatch(getAllUsers())
            dispatch(getAllRolesOptions())
          })
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }
  // const customStyles = {
  //   headCells: {
  //     style: {
  //       padding: '0 29px'
  //     },
  //   }
  // };

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
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
      name: "Status",
      selector: (row) =>
        <small
          className={classNames('badge', {
            'badge-success': !!row.status,
            'badge-danger': !row.status
          })}
        >
          {!!row.status ? 'Active' : 'Inactive'}
        </small>,
      sortable: true
    },
    // {
    //   name: "Status",
    //   selector: (row) => (row.status === 1)
    //     ? <small class="badge badge-success">Active</small> : <small class="badge badge-danger">Inactive</small>,
    //   sortable: true
    // },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/users/edit/${row.id}`} className="btn btn-info">
            <i className="right fas fa-edit"></i> Edit
          </Link>
          {/* <button type="button" onClick={() => handleDelete(row.id)} className="btn btn-danger">
            <i className="right fas fa-trash"></i>
          </button> */}
        </div>
      )
    },
    {
      name: "Change Status",
      cell: (row) => (
        <div className="form-group">
          <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
            <input type="checkbox" className="custom-control-input" onChange={(event) => handleStatusChange(event, row.id)} checked={userStatus[row.id] == '1'} id={`customerSwitch${row.id}`} disabled={isChangingStatus} />
            <label className="custom-control-label" htmlFor={`customerSwitch${row.id}`}></label>
          </div>
        </div>
      )
    },
  ];

  // const tableData = {
  //   columns,
  //   users
  // };

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllRolesOptions())
    return () => {
      dispatch(clearMessage())
    }
  }, [])

  useEffect(() => {
    const userDetails = {}
    users.forEach(user => {
      userDetails[user.id] = user.status
    })
    setUserStatus(userDetails)
  }, [users])

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
        <Link to='/users/add' className="btn btn-primary create-user"><i className="right fas fa-plus-circle"></i> Create User</Link>
        <div className="custom-data-table">
          {/* <DataTableExtensions
            columns={columns}
            data={users}
          > */}
          <DataTable
            title="Users"
            columns={columns}
            data={users}
            defaultSortFieldID={1}
            pagination
            progressPending={isFetching}
          // customStyles={customStyles}
          />
          {/* </DataTableExtensions> */}
        </div>
      </div>
    </div>
  );
};

export default Users;
