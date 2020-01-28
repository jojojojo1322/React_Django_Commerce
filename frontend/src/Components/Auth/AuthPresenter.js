import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, ButtonToolbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const AuthPresenter = ({
  kind,
  onChangeInput,
  username,
  password,
  onLogin,
  onRegister,
  error
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      switch (kind) {
        case "register":
          onRegister();
          return;
        case "login":
          onLogin();
          return;
        default:
          return;
      }
    }
  };
  return (
    <Container
      style={{ background: "#fff", width: "500px", marginTop: "50px" }}
    >
      <h1>Login</h1>
      <Form onSubmit={this.handleSubmit} style={{ marginTop: "50px" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Form.Text className="emailInput">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
        <div style={{ display: "flex" }}>
          <ButtonToolbar>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "auto", display: "box" }}
            >
              Login
            </Button>
          </ButtonToolbar>
          <ButtonToolbar>
            <Button variant="outline-success" type="button">
              SocialLogin
            </Button>
          </ButtonToolbar>
        </div>
      </Form>

      <br></br>
      <br></br>

      <div className={cx("auth-form")}>
        <div className={cx("title")}>{kind.toUpperCase()}</div>
        <div className={cx("error")}>
          {error.triggered && (
            <div className={cx("message")}>{error.message}</div>
          )}
        </div>
        <div className={cx("line-wrapper")}>
          <div className={cx("input-title")}>username</div>
          <input />
        </div>
        <div className={cx("line-wrapper")}>
          <div className={cx("input-title")}>password</div>
          <input />
        </div>
        {kind === "register" ? (
          <div className={cx("auth-button")} onClick={onRegister}>
            {kind.toUpperCase()}
          </div>
        ) : (
          <div className={cx("auth-button")} onClick={onLogin}>
            {kind.toUpperCase()}
          </div>
        )}
        {kind === "register" ? (
          <Link to={`/auth/login`} className={cx("description")}>
            if you already have account...
          </Link>
        ) : (
          <Link to={`/auth/register`} className={cx("description")}>
            if you don't have an account...
          </Link>
        )}
      </div>
    </Container>
  );
};

export default AuthPresenter;