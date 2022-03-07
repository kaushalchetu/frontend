import { logout } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const logOut = () => {
        dispatch(logout());
        navigate("/");
    }
    
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars"></i></Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link" data-toggle="dropdown">
                        <strong>Welcome! {user.first_name}</strong> <i className="far fa-user"></i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <Link to="/profile" className="dropdown-item">
                            <i className="fas fa-user-secret mr-2"></i> My Profile
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to="/change/password" className="dropdown-item">
                            <i className="fas fa-cog mr-2"></i> Change Password
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={logOut} className="dropdown-item">
                            <i className="fas fa-lock mr-2"></i> Logout
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header;