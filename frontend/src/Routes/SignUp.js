import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    name: "",
    password1: "",
    password2: "",
    phone: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handle = e => {
    alert('중복확인 되었습니다.')
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("aaaaa");
    const value = this.state;
    console.log(value);
    axios
    .post("http://127.0.0.1:8000/auth/registration/", {
      email: this.state.email,
      name: this.state.name,
      password1: this.state.password1,
      password2: this.state.password2,
      phone: this.state.phone
    })
    .then(res => alert("인증 이메일을 발송했습니다.   이메일을 확인해주세요"),
    this.props.history.push("/"))
    .catch(err => console.log(err));
    
  };
  render() {
    return (
      <Container
        style={{ background: "#fff", width: "500px", marginTop: "50px" }}
      >
        <h1>SignUp</h1>

        <Form onSubmit={this.handleSubmit} style={{ marginTop: "50px" }}>
          <Form.Row>
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                name="email"
              />
              <Button
                variant="primary"
                style={{ float: "Right" }}
                name="email"
                onClick={this.handle}
              >
                중복확인
              </Button>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>별명</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nickName"
                onChange={this.handleChange}
                name="name"
              />
              <Button
                variant="primary"
                style={{ float: "Right" }}
                name="name"
                onClick={this.handle}
              >
                중복확인
              </Button>
            </Form.Group>
          </Form.Row>
          <Form.Group
            controlId="formGridPassword"
            style={{ textAlign: "left" }}
          >
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              name="password1"
            />
          </Form.Group>
          <Form.Group
            controlId="formGridPassword"
            style={{ textAlign: "left" }}
          >
            <Form.Label>비밀번호확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              name="password2"
            />
          </Form.Group>

          <Form.Group
            controlId="formGridAddress1"
            style={{ textAlign: "left" }}
          >
            <Form.Label>휴대폰번호</Form.Label>
            <Form.Control
              placeholder="000-0000-0000"
              onChange={this.handleChange}
              name="phone"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: "Right" }}>
            가입하기
          </Button>
        </Form>
        <br />
        <br />
        <br />
      </Container>
    );
  }
}
export default SignUp;