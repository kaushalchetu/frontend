import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { user } = useSelector(state => state.auth);
    //console.log(user.role_id);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <span className="brand-text font-weight-light"> <img src="/images/logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} /></span>
            </Link>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {user.role_id === 1 ?
                            <>
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
                                                <p>Create User</p>
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
                                                <p>Create Role</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                            :
                            null}
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                <i className="nav-icon fas fa-database"></i>
                                <p>
                                    RunData Reports
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/import/rundata/reports" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Import</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/generate/rundata/reports" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Generate</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                <i className="nav-icon fas fa-list"></i>
                                <p>
                                    SIC Reports
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/import/sic/reports" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Import</p>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/generate/sic/reports" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Generate</p>
                                    </Link>
                                </li> */}
                                {/* <li className="nav-item">
                                    <Link to="/sic/graph/charts" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>SIC Graph Charts</p>
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/sic30/graph/charts" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>SIC30 Graph Charts</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sic27/graph/charts" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>SIC27 Graph Charts</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sic14/graph/charts" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>SIC14 Graph Charts</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/graph/charts" className="nav-link">
                                <i className="nav-icon fas fa-signal"></i>
                                <p>
                                    Graph Charts
                                </p>
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;