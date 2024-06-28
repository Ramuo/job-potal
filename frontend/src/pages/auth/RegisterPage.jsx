import {useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
// import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {toast} from "react-toastify";
import "../../inputFix.css";
import RegisterImg from "../../assets/images/register.png";
import ObZeelogo from "../../assets/images/JobZeelogo.png";


import {useRegisterMutation} from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");

  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [register, {isLoading}] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ name, email, phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src={ObZeelogo } alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form
          onSubmit={submitHandler} 
          >
            {/* <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div> */}
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Zeeshan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="spin-button-none"
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">
              {isLoading ? (
                "Loading...."
              ) : (
                "Register"
              )}
            </button>
            <Link to="/login">Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src={RegisterImg} alt="login" />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;