import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useFormRegistr } from "../../helpers/forms";

import "./styles.css";
import { registrateNewUserThunk } from "../../Redux/projectSlice";
import { ErrorAlert, SuccessAlert } from "../../helpers/errorHelpers";

export const SignUp = () => {
  const [authData, authChange] = useFormRegistr();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendFail, setIsSendFail] = useState(false);
  const [isError, setIsError] = useState("");

  const cb = () => navigate("/auth/sign-in", { replace: true });
  const regSubmit = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      name: { value: name },
      surname: { value: surname },
      confirmPassword: { value: confirmPassword },
      password: { value: password },
    } = e.target;

    

    const authDataSend = {
      email : email.toLowerCase(),
      password,
      name,
      surname,
      confirmPassword,
    };
    dispatch(
      registrateNewUserThunk({
        authDataSend,
        cb,
        setIsSendFail,
        setIsSendSuccess,
        setIsError,
      })
    );
  };

  return (
    <div className="sign-up">
      <ErrorAlert isSendFail={isSendFail} errorTitle={isError} />
      <SuccessAlert isSendSuccess={isSendSuccess} successTitle={"Success"} />
      <h3 className="login-header"> Please Login to Your account </h3>
      <Form className="col-10" onSubmit={regSubmit}>
        <FormGroup row>
          <Col sm={12}>
            <Input
              id="registrName"
              name="name"
              placeholder="Write Your Name"
              type="text"
              onChange={authChange}
              invalid={!!authData.name.error}
            />
            {!!authData.email.error && (
              <FormFeedback>{authData.name.error}</FormFeedback>
            )}
          </Col>
        </FormGroup>{" "}
        <FormGroup row>
          <Col sm={12}>
            <Input
              id="registerSurname"
              name="surname"
              placeholder="Write Your Surname"
              type="text"
              onChange={authChange}
              invalid={!!authData.surname.error}
            />
            {!!authData.email.error && (
              <FormFeedback>{authData.surname.error}</FormFeedback>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={12}>
            <Input
              id="registerEmail"
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
          <Col sm={12}>
            <Input
              id="registerPassword"
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
        <FormGroup row>
          <Col sm={12}>
            <Input
              id="registerComfirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Comfirm Your password"
              onChange={authChange}
              invalid={!!authData.confirmPassword.error}
            />
            {!!authData.password.error && (
              <FormFeedback>{authData.confirmPassword.error}</FormFeedback>
            )}
          </Col>
        </FormGroup>
        <Col
          sm={{
            size: 12,
          }}
          style={{ textAlign: "center" }}
        >
          <Button>Register</Button>
        </Col>
      </Form>

      <div className="move_to_registration">
        <span>
          Already have an account? <Link to={"/auth/sign-in"}> Sign in </Link>
          here!
        </span>
      </div>
    </div>
  );
};
