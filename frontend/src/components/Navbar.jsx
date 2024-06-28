import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../assets/images/JobZee-logos__white.png"

import {useLogoutMutation} from "../slices/userApiSlice";
import {logout} from "../slices/authSlice";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const {userInfo} = useSelector((state) => state.auth);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className={userInfo ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src={Logo } alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/jobsList" onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {/* {userInfo && userInfo.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"} */}
                APPLICATIONS
            </Link>
          </li>
          {userInfo && userInfo.role === "Employer" ? (
            <>
              <li>
                <Link to="/createjob" onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to="/myjobs" onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={logoutHandler}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar