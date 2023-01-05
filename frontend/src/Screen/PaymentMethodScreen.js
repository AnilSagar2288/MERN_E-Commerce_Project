import React, { useState } from "react";
import { Form, Button, Col} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../action/cartActions";
import FormContainer from "../component/FormContainer";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../component/CheckOutSteps";

const PaymentMethodScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Mathod</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mt-4" controlId="address">
          <Form.Label as="legend">Select Mathod</Form.Label>
          {/* <Form.Control type='checkbox' value={paymentMethod} required onChange={(e)=> setPaymentMethod(e.target.value)}  /> */}
        
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="pamentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          {/* <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="pamentMethod"
            value="Stripe"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}
        </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
