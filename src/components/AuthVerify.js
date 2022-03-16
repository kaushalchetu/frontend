import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../redux/actions/auth"
import { clearMessage } from "../redux/actions/message"

const AuthVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            const decodedJwt = parseJwt(token);
            //console.log('is token expired', decodedJwt.exp * 1000 < Date.now(), '==>', decodedJwt.exp * 1000, Date.now())
            if (decodedJwt.exp * 1000 < Date.now()) {
                dispatch(clearMessage());
                dispatch(logout());
                navigate("/");
                window.location.reload()
            }
        }
    }, [location])

    const parseJwt = token => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    return null
}

export default AuthVerify