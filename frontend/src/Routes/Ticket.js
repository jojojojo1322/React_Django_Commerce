import React from "react";
import { Button,Toast } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { HashRouter as Link } from "react-router-dom";
import axios from "axios";
import {RouteComponentProps} from "react-router";
 

  function onClickPayment() {
    console.log("pay2")
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp90491223');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}` ,  // 주문번호
      amount: 1000,                                 // 결제금액
      name: '김종욱찾기',                  // 주문명
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
      
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg,
      
    } = response;

    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

class Ticket extends React.Component {
  
  state = {
    tickets:[],
    jbSplit:[]
  };

  async componentWillMount() {

 
    try{
      const res = await fetch("http://127.0.0.1:8000"+this.props.location.pathname)
      const tickets = await res.json();
      this.setState({tickets})

      var jbReplace = tickets.detail_src.replace('[',"").replace(/'/gi,'').replace(']',"").replace(' ','');
      var jbSplit = jbReplace.split(',');
      this.setState({jbSplit})
      console.log(this.state.jbSplit)
      console.log(this.state.tickets)
    }catch(e){
    }
  }


  render() {
      const a = this.props
    //   const Post = (props: RouteComponentProps<{postId: string}>)
    return (
      <Container
        style={{
          background: "#fff",
          width: "1200px",
          marginTop: "50px",
          height: "800px"
        }}
      >
      <div>
        <div
          style={{ width: "100%", background: "#f4f4f4", marginTop: "50px" }}
        >
          <div style={{ width: "100%", background: "#f4f4f4" }}>
            <div
              style={{ paddingTop: "20px", width: "820px", margin: "0 auto" }}
            >
              <div
                style={{
                  float: "left",
                  position: "relative",
                  width: "500px",
                  height: "345px",
                  marginRight: "15px",
                  background: "#fff",
                  outline: "1px solid, #eee"
                }}
              >
                <img src={"https://timeticket.co.kr/"+this.state.tickets.img_src} style={{width:"100%",height:"93%"}}></img>
              </div>
              <div style={{ float: "right", width: "305px" }}>
                <div
                  style={{
                    background: "#fff",
                    padding: "0 10px",
                    outline: "1px solid #eee"
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px 0 10px 0",
                      wordWrap: "break-word",
                      wordBreak: "keep-all"
                    }}
                  >
                    <span
                      style={{
                        border: "1px solid #ddd",
                        padding: "2px 3px",
                        fontSize: "13px",
                        color: "#777",
                        borderRadius: "7px",
                        verticalAlign: "2px"
                      }}
                    >
                      {this.state.tickets.area}
                    </span>
                    <span
                      style={{
                        marginLeft: "2px",
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#000"
                      }}
                    >
                      {this.state.tickets.title}
                    </span>
                  </div>
                  <div
                    style={{ textAlign: "center", padding: "0px 5px 15px 5px" }}
                  >
                    <div
                      style={{
                        borderTop: "1px solid #eee",
                        padding: "15px 0 5px 0",
                        overflow: "hidden",
                        fontSize: "12px",
                        fontWeight: "300",
                        color: "#8b8b8b"
                      }}
                    >
                      <div style={{ float: "left" }}>
                        <strike>45,000원</strike>
                      </div>
                      <div style={{ float: "right", paddingRight: "10px" }}>
                        평일 1인 타임세일 기준
                      </div>
                    </div>

                    <div
                      style={{
                        overflow: "hidden",
                        fontSize: "18px",
                        color: "#ed1c24",
                        fontWeight: "400"
                      }}
                    >
                      <div style={{ float: "left" }}>
                        최대 {this.state.tickets.sale}<span style={{ fontSize: "14px" }}>%</span> 할인
                      </div>
                      <div style={{ float: "right" }}>{this.state.tickets.price}~</div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    position: "relative",
                    top: "0",
                    left: "0",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{ textAlign: "center", paddingTop: "10px" }}
                  ></div>
                  <Button onClick={onClickPayment} style={{ background: "#FF3399", width: "100%" }}>
                    구매하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "100px",
              fontSize: "18px",
              fontWeight: "500",
              color: "#000",
              verticalAlign: "middle"
            }}
          >
            예매자
            <span style={{ color: "#f00", fontWeight: "500" }}> 별점 4.7</span>
            <span style={{ color: "#555", fontSize: "13px" }}>
              {" "}
              / 5.0 (총 264명)
            </span>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #eee",
              marginTop: "10%"
            }}
          >
          </div>
        </div>
      </div>
      <div style={{
      border:" 1px solid #eee",
      borderTop: "none",
      padding:" 30px 59px",
      background:" #fff",
      fontSize:" 13px",
      color: "#313131",
      lineHeight: "1.8em",
      letterSpacing:" -0.5px"
      }}>
<div class="viewpage_text" style={{marginTop:"15px;", fontSize:"13pt"}}>
				<p style={{fontSize: "20pt"}}>예매정보</p>
<p >공연기간:&nbsp;<span style={{fontSize: "13pt"}}>OPEN RUN</span></p>
<p >예매가능시간: 공연 10분 전 까지</p>
<p >&nbsp;</p>
<p style={{fontSize: "20pt"}}>관람정보</p>
<p >관람등급: 만 13세 이상 (신분증/학생증 지참)</p>
<p>공연시간: 약 100분</p>
<p>티켓배부: 현장수령 (공연 60분 전부터 공연장 앞 매표소 배부)</p>
<p>티켓교환: 문자티켓 또는 본인확인 후 발권</p>
<p>좌석배정: 타예매처 지정석 제외 후 매표소 선착순 배정(앞→뒤, 중앙→사이드)</p>
<p>입장시간: 공연 시작 15분 전 부터 입장 가능</p>
<p style={{color:"red"}}>※비지정석 예매입니다. 상단 좌석배정 방식을 확인하세요.</p>
<p style={{color:"red"}}>※각각 예매하더라도 함께 발권하면 연석 배정 가능합니다.</p>
<p>&nbsp;</p>
<p class="viewpage_noti">주의사항</p>
<p>공연 시작 후 입장 불가, 공연 중 퇴장 시 재입장 불가</p>
<p>지각으로 인해 관람하지 못할 시 환불/변경 불가</p>
<p>지역착오, 연령미숙지로 관람하지 못할 시 환불/변경 불가</p>
<p>음식물 반입 금지, 공연 중 사진/동영상 촬영 금지</p>
<p style={{color:"red"}}>※당일 관람티켓은 결제 후 환불/변경이 절대 불가합니다.</p>
<p style={{color:"red"}}>※예매 전 환불규정 및 주의사항을 미리 확인해주세요!</p>
			</div>
               {this.state.jbSplit ? this.state.jbSplit.map(photo =>{
        return (
          <div style={{
            marginTop: "0px",
            width: "700px",
            textAlign: "center"}}>
          <img style={{maxWidth: "100%", width: "700px", marginLeft:"20%"}} src={photo}></img>
          </div>
          )
        }):""}
        
      </div>
      </Container>
    );
  }
}

export default Ticket;