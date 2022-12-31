import React, { useState, useEffect, useRef } from "react";
import "./SignUp.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CREATE_USER = gql`
  mutation Mutation($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

function SignUp() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);
  const [signup] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [confirmPasswordClass, setConfirmPasswordClass] =
    useState("input-form");
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(true);
  const [isshowReqMessage, setIsshowReqMessage] = useState(false);
  const [accept, setAccept] = useState(false);
  const ref = useRef(null);
  const [valuesSignUp, setValuesSignUp] = useState({
    nameSignUp: "",
    usernameSignUp: "",
    passwordSignUp: "",
    confirmPasswordSignUp: "",
  });
  const [valuesSignIn, setValuesSignIn] = useState({
    usernameSignIn: "",
    passwordSignIn: "",
  });
  const onChangeSignUp = (event) => {
    setValuesSignUp(
      { ...valuesSignUp, [event.target.name]: event.target.value },
      setIsshowReqMessage(false)
    );
  };

  const onChangeSignIn = (event) => {
    setValuesSignIn(
      { ...valuesSignIn, [event.target.name]: event.target.value },
      setIsshowReqMessage(false)
    );
  };

  const signupHandler = () => {
    setShowSignUpForm(true);
    setShowSignInForm(false);
  };

  const signinHandler = () => {
    setShowSignUpForm(false);
    setShowSignInForm(true);
  };
  const acceptConditionsHandler = () => {
    // console.log(ref.current.checked);
    setAccept(ref.current.checked);
  };
  useEffect(() => {
    if (isConfirmPasswordDirty) {
      if (valuesSignUp.passwordSignUp === valuesSignUp.confirmPasswordSignUp) {
        setShowErrorMessage(false);
        setConfirmPasswordClass("input-form is-valid");
      } else {
        setShowErrorMessage(true);
        setConfirmPasswordClass("input-form is-invalid");
      }
    }
  }, [valuesSignUp.confirmPasswordSignUp]);

  const submitChageHandler = async (e) => {
    e.preventDefault();
    if (
      valuesSignUp.usernameSignUp.trim().length === 0 ||
      valuesSignUp.nameSignUp.trim().length === 0
    ) {
      setIsshowReqMessage(true);
    }
    try {
      const res = await signup({
        variables: {
          name: valuesSignUp.nameSignUp,
          username: valuesSignUp.usernameSignUp,
          password: valuesSignUp.passwordSignUp,
        },
      });
      // console.log(res.data.signup.token);
      cookies.set("token", res.data.signup.token, { path: "/" });
      window.location.assign(`/dashboard`);
    } catch (error) {
      return alert(error.message);
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (
      valuesSignIn.usernameSignIn.trim().length === 0 ||
      valuesSignIn.passwordSignIn.trim().length === 0
    ) {
      setIsshowReqMessage(true);
    }
    try {
      const res = await login({
        variables: {
          username: valuesSignIn.usernameSignIn,
          password: valuesSignIn.passwordSignIn,
        },
      });
      console.log(res.data.login.token);
      cookies.set("token", res.data.login.token, { path: "/" });
      window.location.assign(`/dashboard`);
    } catch (error) {
      return alert("password or username is wrong...");
    }
  };
  return (
    <div className="container-form">
      <div className="form">
        <div className="btn">
          <button onClick={signupHandler} className="sign-up-button">
            SIGN UP
          </button>
          <button onClick={signinHandler} className="sign-in-button">
            SIGN IN
          </button>
        </div>
        {showSignUpForm && (
          <form onSubmit={submitChageHandler} action="" className="signUp">
            <div className="formGroup">
              <input
                className="input-form"
                value={valuesSignUp.nameSignUp}
                type="text"
                name="nameSignUp"
                id="name"
                placeholder="Name..."
                autoComplete="off"
                onChange={onChangeSignUp}
              />
            </div>
            {isshowReqMessage && !valuesSignUp.nameSignUp ? (
              <span className="formGroup-required">this field is required</span>
            ) : (
              ""
            )}
            <div className="formGroup">
              <input
                className="input-form"
                value={valuesSignUp.usernameSignUp}
                type="text"
                name="usernameSignUp"
                id="username"
                placeholder="Username..."
                autoComplete="off"
                onChange={onChangeSignUp}
              />
            </div>
            {isshowReqMessage && !valuesSignUp.usernameSignUp ? (
              <span className="formGroup-required">this field is required</span>
            ) : (
              ""
            )}
            <div className="formGroup">
              <input
                className="input-form"
                value={valuesSignUp.passwordSignUp}
                type="password"
                name="passwordSignUp"
                id="password"
                placeholder="Password..."
                autoComplete="off"
                onChange={onChangeSignUp}
              />
            </div>
            <div className="formGroup">
              <input
                value={valuesSignUp.confirmPasswordSignUp}
                type="password"
                name="confirmPasswordSignUp"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
                className={confirmPasswordClass}
                onChange={onChangeSignUp}
              />
              {showErrorMessage && isConfirmPasswordDirty ? (
                <span className="sym-error">&#10006;</span>
              ) : (
                ""
              )}
            </div>
            {showErrorMessage && isConfirmPasswordDirty ? (
              <span className="formGroup">password doesn't match</span>
            ) : (
              ""
            )}
            {/* Adding Check Box */}
            <div className="checkBox">
              <input
                ref={ref}
                onChange={acceptConditionsHandler}
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <span className="text">I agree with term & conditions </span>
            </div>
            <div className="formGroup">
              <button
                disabled={
                  (showErrorMessage && isConfirmPasswordDirty) || !accept
                    ? true
                    : false
                }
                className="btn2"
              >
                REGISTER
              </button>
            </div>
          </form>
        )}

        {/* LOGIN FORM */}
        {showSignInForm && (
          <form onSubmit={loginHandler} action="" className="login">
            <div className="formGroup">
              <input
                className="input-form"
                value={valuesSignIn.usernameSignIn}
                type="text"
                name="usernameSignIn"
                id="username"
                placeholder="Username..."
                autoComplete="off"
                onChange={onChangeSignIn}
              />
            </div>
            {isshowReqMessage && !valuesSignIn.usernameSignIn ? (
              <span className="formGroup-required">this field is required</span>
            ) : (
              ""
            )}
            <div className="formGroup">
              <input
                className="input-form"
                value={valuesSignIn.passwordSignIn}
                type="password"
                name="passwordSignIn"
                id="password"
                placeholder="Password..."
                autoComplete="off"
                onChange={onChangeSignIn}
              />
            </div>
            {isshowReqMessage && !valuesSignIn.passwordSignIn ? (
              <span className="formGroup-required">this field is required</span>
            ) : (
              ""
            )}
            {/* Adding Check Box */}
            <div className="formGroup">
              <button
                className="btn2"
                disabled={
                  valuesSignIn.passwordSignIn.trim().length === 0 ||
                  valuesSignIn.usernameSignIn.trim().length === 0
                    ? true
                    : false
                }
              >
                SIGN IN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;
