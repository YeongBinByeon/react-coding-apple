import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../store";
import { useLike } from "../hooks/like";
import { useUsername } from "../hooks/name";

function Detail(props) {
  useLike();

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(true);
  const [탭, 탭변경] = useState(0);
  const [fade2, setFade2] = useState("");

  let { id } = useParams();

  const 찾은상품 = props.shoes.find((item) => {
    return parseInt(item.id) === parseInt(id);
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    var 꺼낸거 = JSON.parse(localStorage.getItem("watched"));

    꺼낸거.push(찾은상품.id);
    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);
    // setTimeout(() => {}, 1100);
    localStorage.setItem("watched", JSON.stringify(꺼낸거));
  }, []);

  // function setItemNumberInStorage(index) {
  //   var watched = JSON.parse(localStorage.getItem("watched"));
  //   watched.push();
  //   // setTimeout(() => {}, 1100);
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  let [like, addLike] = useLike();
  const name = useUsername();

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
          {name}
          {like}{" "}
          <span
            onClick={() => {
              addLike();
            }}
          >
            ♡
          </span>
          <img src={찾은상품.url} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem(찾은상품));
            }}
          >
            주문하기
          </button>
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

  return <div className={`start ${fade}`}></div>;
}

export default Detail;
