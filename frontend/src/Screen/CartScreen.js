import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useParams, useLocation, Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../action/cartActions";
import Message from '../component/Message'
import { useNavigate } from "react-router-dom";


const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  // const query = new URLSearchParams(useLocation().search)
  // const qty = query.get("qty" || "")
  const query = useLocation().search;
  const qty = query ? Number(query.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=> state.cart)
  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [qty, id, dispatch]);

const removeFromCartHandler = (id) =>{
  dispatch(removeFromCart(id))
}

const checkoutHandler = () =>{  
  navigate('/login?redirect=/shipping')
}

  return <>
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>:
          (
            <ListGroup variant="flush">
              {cartItems.map((item)=>(
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.thumbnail} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to ={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {item.price}
                    </Col>
                    <Col md={2}>
                    <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
        <ListGroup variant="flush">
          <ListGroup.Item >
            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty,0)}) Items</h2>
            ${cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item >
            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler} style={{width:"100%"}}>
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
        </Card>
      </Col>
    </Row>
  </>;
};

export default CartScreen;
