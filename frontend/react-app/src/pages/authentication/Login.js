import "../../styles/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Checkbox, IconButton } from "@mui/material";
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function Login() {
  const color = "#rgb(60, 60, 63)";
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorFields, setErrorFields] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setErrorFields(false);
    setErrorEmail(false);
    setLoading(false);
    if (!formData.email || !formData.password) {
      setErrorFields(true);
      return;
    }
    if (!EmailValidator.validate(formData.email)) {
      setErrorEmail(true);
      return;
    }
    setLoading(true);
    setformData({
      email: "",
      password: "",
    });
    successToast();
  };

  const successToast = () => {
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="login-div">
      <div className="login-form-container">
        <h1 className="login-heading">Sign In</h1>
        {errorFields && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="login-error-container">
              <span>Please fill-in all required fields</span>
            </div>
          </div>
        )}
        {errorEmail && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="login-error-container">
              <span>Enter a valid email</span>
            </div>
          </div>
        )}
        <form
          onSubmit={loginUser}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          <div className="login-input-section">
            <p className="login-input-label">
              Email Address <span>*</span>
            </p>
            <input
              className="login-input"
              type="text"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <p className="login-input-hint">
              <Email className="login-icon" />
            </p>
          </div>
          <div className="login-input-section">
            <p className="login-input-label">
              Password <span>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <input
                className="login-input"
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder=""
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <div className="login-password-toggle-container">
                <IconButton
                  color="primary"
                  sx={{ p: "2px" }}
                  aria-label="directions"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff
                      className="login-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  ) : (
                    <Visibility
                      className="login-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  )}
                </IconButton>
              </div>
            </div>
            <p className="login-input-hint">
              <Password className="login-icon" />
            </p>
          </div>
          <div className="login-remember-me">
            <IconButton>
              <Checkbox />
            </IconButton>
            <span className="login-remember-me-text">Remember me?</span>
          </div>
          <div className="login-input-section">
            <Button
              className="login-submit-button"
              variant="contained"
              type="submit"
              endIcon={<ClipLoader color={color} loading={loading} size={15} />}
              disabled={loading}
            >
              LOGIN
            </Button>
          </div>
        </form>
        <span className="login-have-account">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="login-have-account-signin">Sign Up</span>
          </Link>
        </span>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
