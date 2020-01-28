import React from "react";
import { Button, Form, ButtonToolbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Redirect } from "react-router-dom";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLogin: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/auth/login/", {
        email: this.state.email,
        password: this.state.password
      })
      .then(
        
        res => localStorage.setItem("token",res.data.token),
        this.props.history.push("/#/"),
        this.setState({ isLogin: true }),
      )
      .catch(err => console.log(err));
  };

  render() {
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
              onChange={this.handleChange}
              name="email"
            />
            <Form.Text className="emailInput">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
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
          </div>
        </Form>
        <br></br>
        <br></br>
      </Container>
    );
  }
}
export default Login;