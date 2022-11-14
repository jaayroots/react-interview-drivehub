import React, { useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";

function CarList(props: any) {
  const { Car, setCar, Cart, setCart } = props;
  useEffect(() => {
    GetCarList();
  }, []);

  function GetCarList() {
    const config = {
      headers: {
        Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
      },
    };
    axios
      .get(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car",
        config
      )
      .then(function (e: any) {
        console.log(e.data.items);
        const addQty = e.data.items.map((data: any) => ({ ...data, qty: 0 }));
        setCar(addQty);
      });
  }

  function AddToCart(val: any) {
    if (!Cart.find((e: any) => val.sys.id === e.sys.id)) {
      setCart([...Cart, { ...val, qty: (val.qty = 1) }]);
    } else {
      const onAdd = Cart.map((data: any, i: any) =>
        data.sys.id === val.sys.id ? { ...data, qty: data.qty + 1 } : data
      );
      setCart(onAdd);
    }
  }
  return (
    <>
      <Row>
        <Col style={{ border: "1px solid white" }}>
          <h1>Car List</h1>
        </Col>
      </Row>
      {Car.map((val: any, index: any) => {
        return (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{val.fields.title}</Card.Title>
                <Card.Img
                  variant="top"
                  style={{ width: "100%", height: "100%" }}
                  title={val.fields.title}
                  src={val.fields.photo}
                />
                <Card.Title>{val.fields.price} THB/day</Card.Title>
                <Card.Text>
                  Best Car For Rent{" "}
                  <Button href="#" variant="primary" size="sm" disabled>
                    5/5
                  </Button>
                </Card.Text>
                <Button variant="primary" onClick={() => AddToCart(val)}>
                  Add to Card
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
      
      <Col style={{ padding: 30 }}>
      <hr/>
      </Col>
    </>
  );
}

export default CarList;
