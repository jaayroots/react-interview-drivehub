import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./logo.svg";
import CarList from "./components/carList";
import CartList from "./components/cartList";

import "./App.css";

function App() {
  const [Cart, setCart] = useState<any>([]);
  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo"></img>
        <span>Drivehub</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <CarList
                Cart={Cart}
                setCart={setCart}
              />
            </Col>
            <Col md={6} style={{ backgroundColor: "" }}>
              <CartList Cart={Cart} setCart={setCart} />
            </Col>
          </Row>
          <Col style={{ padding: 60 }}>
      </Col>
        </Container>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
