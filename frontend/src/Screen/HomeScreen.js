import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../action/productAction.js";
import Message from "../component/Message.js";
import Loader from "../component/Loader.js";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
