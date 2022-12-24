import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/userContext";
import "./auth.css";
import ClipLoader from "react-spinners/ClipLoader";

const SignIn = () => {
  let [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
    setToken,
    setIsAuth,
  } = useUser();
  // console.log(user);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${api}auth/login`, {
        email,
        password,
      });

      const token = data.token;
      if (data) {
        dispatch({ type: "LOGIN", payload: data });
        setLoading(false);

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", token);
        setIsAuth(true);
        setToken(token);
      }

      navigate("/");
    } catch (error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
      });

      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form-heading">Sign In</h2>
        {error && <span className="error-message">{error}</span>}
        <div className="form-control">
          <smal>email</smal>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <small>password</small>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="btn-prim">
          {loading ? <ClipLoader color="white" loading={loading} /> : "log in"}
        </button>

        <button className="btn-sec">
          <Link
            to="/register"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {" "}
            dont have an account ? register
          </Link>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
