import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4001/api/getAllorders")
      .then(response => {
        
        setOrders(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });

    axios.get("http://localhost:4001/api/getAllitems")
      .then(response => {
        setItems(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
      });
  }, [newItem,alertVisible]);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4001/api/addItem", newItem)
      .then(response => {
        setAlertVisible(true);
        setNewItem({ name: "", price: "" });
        setTimeout(() => setAlertVisible(false), 3000);
        axios.get("http://localhost:4001/api/getAllitems").then(res => setItems(res.data.data));
      })
      .catch(error => {
        console.error("Error adding item:", error);
      });
  };

  const closeOrder = (orderId) => {
    axios.put("http://localhost:4001/api/updateOrder", { _id: orderId })
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: "closed" } : order));
      })
      .catch(error => {
        console.error("Error updating order:", error);
      });
  };

  const deleteItem = (itemId) => {
    axios.delete(`http://localhost:4001/api/DeleteItem/${itemId}`)
      .then(response => {
        setItems(items.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <Container>
      {alertVisible && <Alert color="success">Item added successfully!</Alert>}
      <Row>
        <Col sm="8">
          <Card body>
            <h5>Kitchen Orders</h5>
            <Table striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table Number</th>
                  <th>Items</th>
                  <th>Total Order Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.tableNumber}</td>
                    <td>{order.items.map(item => item.itemName).join(", ")}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.status === "open" && (
                        <Button color="danger" size="sm" onClick={() => closeOrder(order._id)}>Close Order</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col sm="4">
          <Card body>
            <h5>Add New Item</h5>
            <Form onSubmit={addItem}>
              <FormGroup>
                <Label for="name">Item Name</Label>
                <Input type="text" name="name" id="name" value={newItem.name} onChange={handleInputChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" value={newItem.price} onChange={handleInputChange} required />
              </FormGroup>
              <Button color="primary" type="submit">Add Item</Button>
            </Form>
          </Card>

          <Card body className="mt-3">
            <h5>Item List</h5>
            <Table striped>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items && items.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button color="danger" size="sm" onClick={() => deleteItem(item._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KitchenDashboard;
