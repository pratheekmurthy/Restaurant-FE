import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from "reactstrap";
import OrderSummary from './OrderSummary'
import DropDown from './Dropdown'

const menuItems = [
  { id: 1, name: "Burger", price: 5 },
  { id: 2, name: "Pizza", price: 8 },
  { id: 3, name: "Pasta", price: 7 },
  { id: 4, name: "Salad", price: 4 }
];

const RestaurantApp = () => {
  const [order, setOrder] = useState([]);
  const [table,setTable]=useState([1,2,3,4,5,6,7])

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  };

  const removeFromOrder = (id) => {
    setOrder((prevOrder) => {
      return prevOrder
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    });
  };

  const UpdateTable=(e)=>{
    setTable(e.target.value)
  }

  return (
    <Container>
       <DropDown table={table} UpdateTable={UpdateTable}/> <br/>
      <Row>
        {/* Menu List */}
        <Col sm="6">
          <Card body>
            <h5>Menu</h5>
            <ListGroup>
              {menuItems.map((item) => (
                <ListGroupItem key={item.id}>
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
          <OrderSummary order={order} removeFromOrder={removeFromOrder}/>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantApp;