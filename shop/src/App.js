import { createContext, Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { data } from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import axios from "axios";

// import Detail from "./routes/Detail.js";
// import Cart from "./routes/Cart.js";
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

export let Context1 = createContext();

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  });

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((item, index) => {
                    return <Card item={item} />;
                  })}
                </div>
              </div>
              <button
                onClick={async () => {
                  setLoading(true);
                  await sleep(1000);
                  loading && <div>로딩ddddddddd중입니다.</div>;

                  let url = "";
                  url = {
                    0: "https://codingapple1.github.io/shop/data2.json",
                    1: "https://codingapple1.github.io/shop/data3.json",
                  };

                  if (count === 2) {
                    alert("상품 더 없음");
                  }

                  axios
                    .get(url[count])
                    .then((결과) => {
                      setShoes([...shoes, ...결과.data]);
                      setCount(count + 1);
                    })
                    .catch(() => {
                      console.log("실패함");
                      setLoading(false);
                    });
                  // setLoading(false);
                }}
              >
                더보기
              </button>

              {loading === true ? <div>로딩ddddddddd중입니다.</div> : ""}
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Suspense fallback={<div>로딩중임</div>}>
              <Detail shoes={shoes} />
            </Suspense>
          }
        />

        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>로딩중임</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route path="*" element={<div>없는페이지입니다.</div>} />
      </Routes>
    </div>
  );
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="col-md-4">
      <img src={item.url} width="80%" />
      <h4>{item.title}</h4>
      <p>{item.price}</p>
    </div>
  );
}

export default App;
