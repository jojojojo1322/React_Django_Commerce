import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Container from "react-bootstrap/Container";


let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}
class Board extends React.Component {
  state = {
    boards: [],
    number:""
  };
  
  async componentWillMount() {
    
    try{
      const res = await fetch("http://127.0.0.1:8000/board/posts/", {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
      })
      const boards = await res.json();
      this.setState({boards:boards.results})
      console.log(this.state.boards)
    }catch(e){
    }
  }
  handleChange = e => {
    this.setState({
      number: e.target.key
    });
    console.log(e.target.active)
    console.log(this.state.number)
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
        <Table striped>
          <thead>
            <tr>
              <th>작성자</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
        {this.state.boards ? this.state.boards.map(board =>{
        return (
          <tbody>
            <tr>
              <td>{board.user.email}</td>
              <td><a href={"http://localhost:3000/#/board/posts/"+board.id} style={{color:"#000"}}>{board.title}</a></td>
              <td>{board.created_at}</td>
            </tr>
          </tbody>)
        }):""}
        </Table>
        <Button
          style={{
            text_align: "center",
            position: "absolute",
            left: "900px",
            marginTop: "8px"
          }}
          href="#/text"
        >
          글쓰기
        </Button>

        <div
          style={{
            position: "absolute",
            left: "1350px"
          }}
        ></div>
        <Pagination size="sm">{items}</Pagination>
      </Container>
    );
  }
}

export default Board;