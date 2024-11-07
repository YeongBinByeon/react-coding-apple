import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

function Detail(props) {
  useEffect(() => {
    console.log("안녕");
  });

  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(true);
  const [탭, 탭변경] = useState(0);
  const [fade2, setFade2] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  let { id } = useParams();

  const 찾은상품 = props.shoes.find((item) => {
    return parseInt(item.id) === parseInt(id);
  });

  return (
    <div className={`container start ${fade2}`}>
      {alert === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={찾은상품.url} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent(props) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [props.탭]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭]}
    </div>
  );
}

export default Detail;
