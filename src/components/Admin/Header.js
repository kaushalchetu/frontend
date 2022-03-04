import { logout } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <button className="btn btn-danger" onClick={logOut}>
                        <i className="fas fa-lock"></i> Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Header;