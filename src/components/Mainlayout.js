import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem, Alert } from "reactstrap";
import OrderSummary from './OrderSummary';
import DropDown from './Dropdown';

const MainLayout = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4001/api/getAllitems")
      .then(response => {
        setMenuItems(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem._id === item._id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  };

  const removeFromOrder = (id) => {
    setOrder((prevOrder) => {
      return prevOrder
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    });
  };

  const placeOrder = () => {
    const orderData = {
      items: order.map(item => ({ itemName: item.name, price: item.price })),
      tableNumber: table,
      orderStatus: "open"
    };

    axios.post("http://localhost:4001/api/createOrder", orderData)
      .then(response => {
        setAlertVisible(true);
        setOrder([]);
        setTimeout(() => setAlertVisible(false), 3000);
      })
      .catch(error => {
        console.error("Error placing order:", error);
      });
  };

  const UpdateTable = (e) => {
    setTable(e.target.value);
  };

  return (
    <Container>
      <DropDown table={table} UpdateTable={UpdateTable} /> <br />
      {alertVisible && <Alert color="success">Order placed successfully!</Alert>}
      <Row>
        {/* Menu List */}
        <Col sm="6">
          <Card body>
            <h5>Menu</h5>
            <ListGroup>
              {menuItems && menuItems.map((item) => (
                <ListGroupItem key={item._id}>
                  {item.name} - {item.price}rs
                  <Button size="sm" color="primary" className="float-end" onClick={() => addToOrder(item)}>
                    Add
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col sm="6">
          <OrderSummary order={order} removeFromOrder={removeFromOrder} />
          <Button color="success" className="mt-3" onClick={placeOrder}>
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;
