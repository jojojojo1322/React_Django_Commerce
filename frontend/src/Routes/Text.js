import React from "react";
import { Table, Button, Form, span } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

class text extends React.Component {
  state = {
    title: "",
    content: "",
    comments : ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/board/posts/",
        {
          title: this.state.title,
          content: this.state.content,
          comments : []
        },
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
        }
      )
      .then(res => this.props.history.push("/board"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container
        style={{
          background: "#fff",
          width: "1200px",
          marginTop: "50px",
          height: "800px"
        }}
      >
        <br />
        <br />
        <br />
        <h1>Board Text</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              name="title"
              onChange={this.handleChange}
              placeholder="제목을 입력해 주세요."
            />
            <br />
            <Form.Label>글쓰기</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="내용을 입력해 주세요."
              name="content"
              onChange={this.handleChange}
            />

            <div className="input-group" style={{ marginTop: "20px" }}>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  File Upload
                </label>
              </div>
            </div>
          </Form.Group>
          <Button
            style={{
              text_align: "center",
              position: "relative",
              left: "410px"
            }}
            type = "summit"
            size="sm"
          >
            저장
          </Button>
        </Form>
      </Container>
    );
  }
}

export default text;