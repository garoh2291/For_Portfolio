import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useFormLogIn } from "../../helpers/forms";
import "./styles.css";
import { setUserThunk } from "../../Redux/projectSlice";
export const SignIn = () => {
  const [authData, authChange] = useFormLogIn();

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
      email,
      password,
    };
    dispatch(setUserThunk({ authDataSend, cb }));
  };

  return (
    <div className="sign-in">
      <h3 className="login-header"> Please Login to Your account </h3>
      <Form className="col-10" onSubmit={authSubmit}>
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
        <Col
          sm={{
            size: 12,
          }}
          style={{ textAlign: "center" }}
        >
          <Button>Submit</Button>
        </Col>
      </Form>

      <div className="move_to_registration">
        <span>
          Don't have an account? <Link to={"/auth/sign-up"}> Sign up </Link>
          here!
        </span>
      </div>
    </div>
  );
};
