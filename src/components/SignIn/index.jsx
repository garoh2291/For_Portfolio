import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useFormLogIn } from "../../helpers/forms";
import "./styles.css";
import { setUserThunk } from "../../Redux/projectSlice";
export const SignIn = () => {
  const logoSrc = require("../../assets/logo.png");

  ///for error message when write wrong details
  const [isError, setIsError] = useState(false);

  const [authData, authChange] = useFormLogIn();

  const [isButtonWaiting, setIsButtonWaiting] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cb = () => navigate("/project", { replace: true });

  const authSubmit = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    const authDataSend = {
      email: email.toLowerCase(),
      password,
    };
    setIsButtonWaiting((prev) => !prev);
    dispatch(
      setUserThunk({ authDataSend, cb, setIsButtonWaiting, setIsError })
    );
  };

  return (
    <div className="sign-in">
      <div className="login_form_section">
        <h3 className="login-header"> Please Login </h3>
        <img src={logoSrc} alt="pic" />

        <form onSubmit={authSubmit} className="login_form">
          <label htmlFor="contacterEmail"></label>
          <input
            id="contacterEmail"
            name="email"
            placeholder="Write Your email"
            type="email"
            onChange={authChange}
          />
          {!!authData.email.error && (
            <p className="login_validation_error_text">
              {authData.email.error}
            </p>
          )}
          <label htmlFor="contacterNAme"></label>
          <input
            id="contacterNAme"
            name="password"
            type="password"
            placeholder="Type Your password"
            onChange={authChange}
          />
          {!!authData.password.error && (
            <p className="login_validation_error_text">
              {authData.password.error}
            </p>
          )}
          <p
            className={`${
              isError ? `error_message_login` : "error_message_login_none"
            }`}
          >
            Invalid login or password
          </p>
          <button
            className={`${isButtonWaiting ? "button--loading" : ""} button `}
          >
            <span className="button__text ">Login</span>
          </button>
        </form>

        {/* <Form className="col-10" onSubmit={authSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                id="contacterEmail"
                name="email"
                placeholder="Write Your email"
                type="email"
                onChange={authChange}
                invalid={!!authData.email.error}
              />
              {!!authData.email.error && (
                <FormFeedback>{authData.email.error}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                id="contacterNAme"
                name="password"
                type="password"
                placeholder="Type Your password"
                onChange={authChange}
                invalid={!!authData.password.error}
              />
              {!!authData.password.error && (
                <FormFeedback>{authData.password.error}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <p
            className={`${
              isError ? `error_message_login` : "error_message_login_none"
            }`}
          >
            Invalid login or password
          </p>
          <Col
            sm={{
              size: 12,
            }}
            style={{ textAlign: "center" }}
          >
            <button
              className={`${isButtonWaiting ? "button--loading" : ""} button `}
            >
              <span className="button__text ">Login</span>
            </button>
          </Col>
        </Form> */}

        <div className="move_to_registration">
          <span>
            Don't have an account? <Link to={"/auth/sign-up"}> Sign up </Link>
            here!
          </span>
        </div>
      </div>
    </div>
  );
};
