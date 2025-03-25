import {  Card, Button, ListGroup, ListGroupItem } from "reactstrap";


function OrderSummary(props) {
  const { order,removeFromOrder } = props
  
 
  
return (
    <Card body>
      <h5>Order Summary</h5>
      {order.length === 0 ? (
        <p>No items in order.</p>
      ) : (
       <ListGroup>
          {order.map((item) => (
            <ListGroupItem key={item._id}>
              {item.name} x {item.quantity} = {item.price * item.quantity}rs
              <Button
                size="sm"
                color="danger"
                className="float-end"
                onClick={() => removeFromOrder(item.id)}
              >
                Remove
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Card>
  );
}

export default OrderSummary;
