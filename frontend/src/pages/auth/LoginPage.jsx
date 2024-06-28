import {useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import {toast} from "react-toastify";
import RegisterImg from "../../assets/images/register.png";
import ObZeelogo from "../../assets/images/JobZeelogo.png";


import {useLoginMutation} from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [login, {isLoading}] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
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
                "Login"
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

export default LoginPage;