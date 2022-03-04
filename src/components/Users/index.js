import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, getAllRolesOptions, deleteUser, changeUserStatus } from "../../redux/actions/users";
import DataTable from "react-data-table-component";

const Users = () => {
  const dispatch = useDispatch();
  const { users, roleOptions, isFetching } = useSelector(state => state.users);

  const [userStatus, setUserStatus] = useState({})
  const [isChangingStatus, setChangeStatus] = useState(false)

  const { message } = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);

  const handleStatusChange = (event, id) => {

    setChangeStatus(true);
    setSuccessful(false);

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
    dispatch(deleteUser(id))
      .then(() => {
        dispatch(getAllUsers())
        dispatch(getAllRolesOptions())
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
      align: "center"
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/users/edit/${row.id}`} className="btn btn-info">
            <i className="right fas fa-edit"></i>
          </Link>
          <button type="button" onClick={() => handleDelete(row.id)} className="btn btn-danger">
            <i className="right fas fa-trash"></i>
          </button>
        </div>
      )
    },
    {
      name: "Status",
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

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllRolesOptions())
  }, [])

  useEffect(() => {
    const userDetails = {}
    users.forEach(user => {
      userDetails[user.id] = user.status
    })
    setUserStatus(userDetails)
  }, [users])

  return (
    // <div className="container-fluid">
    //     <div className="card-body">
    //     <Link to='/users/add' className="btn btn-primary"><i className="right fas fa-plus-circle"></i> Create User</Link>
    //       <table id="example1" className="table table-bordered table-striped">
    //     <DataTable
    //       title="Users"
    //       columns={columns}
    //       data={users}
    //       defaultSortFieldID={1}
    //       pagination
    //       progressPending={isFetching}
    //       // customStyles={customStyles}
    //     />
    //     </table>
    //     </div>
    //   </div>
    <div className="col-md-12">
      {message && (
        <div className="form-group">
          <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
            {message}
          </div>
        </div>
      )}
      <Link to='/users/add' className="btn btn-primary"><i className="right fas fa-plus-circle"></i> Create User</Link>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        defaultSortFieldID={1}
        pagination
        progressPending={isFetching}
      // customStyles={customStyles}
      />
    </div>
  );
};

export default Users;
