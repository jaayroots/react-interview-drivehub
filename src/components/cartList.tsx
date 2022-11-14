import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

function CartList(props: any) {
  const { Cart, setCart } = props;
  const [DiscountCodeList, setDiscountCodeList] = useState<any>([]);
  const [AddDiscount, setAddDiscount] = useState<string>("");
  const [UseCode, setUseCode] = useState<number>(0);

  useEffect(() => {
    GetDiscount();
  }, []);

  function GetDiscount() {
    const config = {
      headers: {
        Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
      },
    };
    axios
      .get(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount",
        config
      )
      .then(function (e: any) {
        setDiscountCodeList(e.data.items);
      });
  }

  function AddOrRemove(val: any, type: boolean) {
    const onAdd = Cart.map((data: any, i: any) =>
      data.sys.id === val.sys.id
        ? { ...data, qty: type ? data.qty + 1 : data.qty - 1 }
        : data
    );
    setCart(onAdd);
  }

  function CalTotal() {
    const sum = Cart.reduce((accumulator: any, object: any) => {
      return accumulator + object.qty * object.fields.price;
    }, 0);
    return sum;
  }

  function CalGrandTotal() {
    const sum = Cart.reduce((accumulator: any, object: any) => {
      return accumulator + object.qty * object.fields.price;
    }, 0);
    if (sum - UseCode < 0) {
      return 0;
    } else {
      return sum - UseCode;
    }
  }

  function UseCodeDiscount() {
    // allout
    // 400off
    // 2000off
    // 100off
    let CodeDiscount = DiscountCodeList.find(
      (e: any) => e.fields.code === AddDiscount
    );
    if (CodeDiscount) {
      setUseCode(CodeDiscount.fields.amount);
    } else {
      setUseCode(0);
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Cart</h1>
        </Col>
      </Row>
      {Cart.map((val: any, index: any) => {
        return (
          <div key={index}>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      {" "}
                      <Card.Img
                        variant="top"
                        style={{ width: "100%", height: "100%" }}
                        title={val.fields.title}
                        src={val.fields.photo}
                      />
                    </Col>
                    <Col sm={8}>
                      <Col>
                        <Card.Title>{val.fields.title}</Card.Title>
                      </Col>
                      <Row>
                        <Col sm={6}>
                          <Card.Title>{val.fields.price} THB/day</Card.Title>
                        </Col>
                        <Col>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => AddOrRemove(val, true)}
                          >
                            +
                          </Button>
                        </Col>
                        <Col>{val.qty}</Col>
                        <Col>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => AddOrRemove(val, false)}
                          >
                            -
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </div>
        );
      })}
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Total</Card.Title>
            </Col>
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <Card.Title>{CalTotal()}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Discount</Card.Title>
            </Col>
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <Form.Control
                placeholder="Discount Code"
                aria-label="Discount Code"
                aria-describedby="basic-addon1"
                onKeyUp={(e) => UseCodeDiscount()}
                onChange={(e) => setAddDiscount(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Grand Total</Card.Title>
            </Col>
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <Card.Title>{CalGrandTotal()}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Col style={{ padding: 50 }}></Col>
    </>
  );
}

export default CartList;
