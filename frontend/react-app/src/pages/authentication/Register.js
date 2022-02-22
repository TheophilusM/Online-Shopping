import "../../styles/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import {
  Email,
  Password,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function Register() {
  const color = "#rgb(60, 60, 63)";
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [passwordCornfirm, setPasswordCornfirm] = useState("");
  const [countryCode, setCountryCode] = useState("+27");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errorFields, setErrorFields] = useState(false);
  const [errorPasswords, setErrorPasswords] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setErrorFields(false);
    setErrorPasswords(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPasswordLength(false);
    setLoading(false);
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone
    ) {
      setErrorFields(true);
      return;
    }
    if (!EmailValidator.validate(formData.email)) {
      setErrorEmail(true);
      return;
    }
    if (formData.phone.length <= 8) {
      setErrorPhone(true);
      return;
    }
    if (formData.password.length <= 7) {
      setErrorPasswordLength(true);
      return;
    }
    if (formData.password !== passwordCornfirm) {
      setErrorPasswords(true);
      return;
    }
    successToast();
    setLoading(true);
    setformData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const successToast = () => {
    toast.success("Registration successful!", {
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
    <div className="register-div">
      <div className="register-form-container">
        <h1 className="register-heading">Create Account</h1>
        {errorFields && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="register-error-container">
              <span>Please fill-in all required fields</span>
            </div>
          </div>
        )}
        {errorPasswords && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="register-error-container">
              <span>Passwords should match</span>
            </div>
          </div>
        )}
        {errorPasswordLength && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="register-error-container">
              <span>Passord should be at least 8 characters</span>
            </div>
          </div>
        )}
        {errorEmail && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="register-error-container">
              <span>Enter a valid email</span>
            </div>
          </div>
        )}
        {errorPhone && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="register-error-container">
              <span>Enter a valid phone number</span>
            </div>
          </div>
        )}
        <form
          onSubmit={registerUser}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          <div className="register-input-section">
            <p className="register-input-label">
              First Name <span>*</span>
            </p>
            <input
              className="register-input"
              type="text"
              name="firstName"
              placeholder=""
              value={formData.firstName}
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <p className="register-input-hint">
              <Person className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <p className="register-input-label">
              Last Name <span>*</span>
            </p>
            <input
              className="register-input"
              type="text"
              name="lastName"
              placeholder=""
              value={formData.lastName}
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <p className="register-input-hint">
              <Person className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <p className="register-input-label">
              Email Address <span>*</span>
            </p>
            <input
              className="register-input"
              type="text"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <p className="register-input-hint">
              <Email className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <p className="register-input-label">
              Phone Number <span>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <div className="register-phones-dropdown">
                <Select
                  value={countryCode}
                  className="register-phones-select"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <MenuItem value="+27">+27</MenuItem>
                  <MenuItem value="+263">+263</MenuItem>
                  <MenuItem value="+242">+262</MenuItem>
                </Select>
              </div>
              <input
                className="register-input"
                style={{ paddingLeft: "65px" }}
                type="phone"
                name="phone"
                placeholder=""
                value={formData.phone}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <p className="register-input-hint">
              <Phone className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <p className="register-input-label">
              Password <span>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <input
                className="register-input"
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder=""
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <div className="register-password-toggle-container">
                <IconButton
                  color="primary"
                  sx={{ p: "2px" }}
                  aria-label="directions"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff
                      className="register-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  ) : (
                    <Visibility
                      className="register-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  )}
                </IconButton>
              </div>
            </div>
            <p className="register-input-hint">
              <Password className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <p className="register-input-label">
              Confirm Password <span>*</span>
            </p>
            <div style={{ position: "relative" }}>
              <input
                className="register-input"
                type={`${showConPassword ? "text" : "password"}`}
                name="passwordCornfirm"
                placeholder=""
                value={passwordCornfirm}
                onChange={(e) => setPasswordCornfirm(e.target.value)}
              />
              <div className="register-password-toggle-container">
                <IconButton
                  color="primary"
                  sx={{ p: "2px" }}
                  aria-label="directions"
                  onClick={() => setShowConPassword(!showConPassword)}
                >
                  {showConPassword ? (
                    <VisibilityOff
                      className="register-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  ) : (
                    <Visibility
                      className="register-visibility-icon"
                      sx={{ fontSize: "20px" }}
                    />
                  )}
                </IconButton>
              </div>
            </div>
            <p className="register-input-hint">
              <Password className="register-icon" />
            </p>
          </div>
          <div className="register-input-section">
            <Button
              className="register-submit-button"
              variant="contained"
              type="submit"
              endIcon={<ClipLoader color={color} loading={loading} size={15} />}
              disabled={loading}
            >
              REGISTER ACCOUNT
            </Button>
          </div>
        </form>
        <span className="register-have-account">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="register-have-account-signin">Sign In</span>
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

export default Register;
