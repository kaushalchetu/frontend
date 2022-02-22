import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">GeoData App</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">Admin</Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                <i className="nav-icon fas fa-users"></i>
                                <p>
                                    Users
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Manage User</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/users/add" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add User</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                <i className="nav-icon fas fa-user"></i>
                                <p>
                                    Roles
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/roles" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Manage Role</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/roles/add" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Role</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;