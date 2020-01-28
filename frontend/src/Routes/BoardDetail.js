import React from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { HashRouter as Link } from "react-router-dom";
import axios from "axios";
import {RouteComponentProps} from "react-router";

class BoardDetail extends React.Component {
  state = {
    boards:[],
    user:[],
    comments:[],
    text:""
  };

  async componentWillMount() {

 
    try{
      const res = await fetch("http://127.0.0.1:8000"+this.props.location.pathname, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
      })
      const boards = await res.json();
      this.setState({boards})
      this.setState({user:boards.user})
      this.setState({comments:boards.comments})
      console.log(this.state.boards)
      console.log(this.state.comments)
    }catch(e){
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.props.location.pathname)
    // this.props.history.push(this.props.location.pathname+"")
    console.log(this.state.text)
    axios
      .post("http://127.0.0.1:8000"+this.props.location.pathname+"/comments/",
      {
        content:this.state.text
      },{
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
      })
      .then(
        console.log("success")
      )
      .catch(err => console.log(err));
  };


  render() {
      const a = this.props
    return (
      <Container
        style={{
          background: "#fff",
          width: "1200px",
          marginTop: "50px",
          height: "1000px"
        }}
      >
         <section>
           <div style={{height:"37px", marginBottom: "10px",paddingTop: "10px"}}>
             <h2>
               <a style={{color:"#3c4790"}}>
                 {this.state.boards.title}
               </a>
             </h2>
           </div>
         </section>
         <article>
           <div style={{position: "relative", borderTop: "2px solid #3c4790", paddingBottom: "37px",zIndex: 13}}>
            <header>
              {this.state.boards.title}
            </header>
            <div style={{margin: "16px 0 29px",paddingBottom: "11px",borderBottom: "1px solid #eee",backgroundColor: "white"}}>
              <span>{this.state.user.email}</span>
              <span style={{content: "",
              display: "inline-block",
              width: "1px",
              height:" 12px",
              background: "#ccc",
              margin: "0 10px 0 6px",
              verticalAlign: "-2px"}}></span>
              <span>{this.state.boards.created_at}</span>
            </div>
           </div>
           <div>
             {this.state.boards.content}
           </div>
         </article>
         <div style={{position:"relative",bottom:-200, borderTop:" 2px solid #525eaa"}}>
         {this.state.comments ? this.state.comments.map(comment =>{
        return (
            <div style={{position: "relative",
            padding: "9px 12px 7px",
            borderTop: "1px solid #eee;"}}>
              <span style={{width: "132px", marginRight: "33px",marginTop:" 3px"}}>
                {comment.user.email}  </span>
              <span style={{width: "132px", marginLeft: "68px",marginRight: "33px",marginTop:" 3px"}}>
                {comment.content}</span>
            </div>
          )
        }):""}
         </div>

         <div style={{position:"relative",bottom:-300, borderTop:" 3px solid #525eaa",background:"#fafafa"}}>
         <Form onSubmit={this.handleSubmit}>   
         <Form.Group controlId="formGridEmail">
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="text"
                style={{
                width: "850px",
                marginTop:"10px",
                marginLeft:"100px",
                height: "78px",
                padding: "13px",
                border: "1px solid #cecdce",
                background: "#fff",
                fontFamily: "굴림 ,Gulim",
                fontSize: "13px",
                color: "#333",
                lineHeight: "18px"}}
              />
            </Form.Group>

            <button

            onClick={this.handleSubmit}
            style={{
              position:"relative",
              bottom:"0",
              width: "85px",
              background: "#4a57a8",
              borderColor: "#3c4790",
              textShadow: "0px -1px #343d8e",
              color: "#fff",
              height: "31px",
              lineHeight: "30px",
              marginLeft: "3px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "2px",
              fontSize: "12px",
              fontWeight: "bold"
             }}
             type="submit">등록</button>
            </Form>
          </div>
      </Container>
    );
  }
}

export default BoardDetail;