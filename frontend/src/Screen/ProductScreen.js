import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../component/Rating";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message.js";
import Loader from "../component/Loader.js";
import {
  productDetailsAction,
  productCreateReviewAction,
} from "../action/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";

import ProductSlider from "../component/ProductSlider";
import Product from "../component/Product";
import ReactImageMagnify from "react-image-magnify";

const ProductScreen = () => {
  const [proImage, setProImage] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingProductList,
    products,
    error: errorProductList,
  } = useSelector((state) => state.productList);

  useEffect(() => {
    const filterProduct = products.filter(
      (item) => item.category === product.category
    );
    setRelatedProduct(filterProduct);
    setProImage(product.thumbnail);
  }, [product, products]);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { error: errorProductReview, success: successProductReview } =
    useSelector((state) => state.createProductReview);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating();
      setComment();
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetailsAction(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHadler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productCreateReviewAction(id, { rating, comment }));
  };

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {product.image && product.image.length > 0 ? (
              <Col md={1}>
                {product.image &&
                  product.image.map((item, i) => (
                    <Card key={i} style={{ marginBottom: "10px" }}>
                      <Card.Img
                        src={item}
                        alt={`image-${i}`}
                        onMouseEnter={() => setProImage(item)}
                      />
                    </Card>
                  ))}
              </Col>
            ) : null}

            <Col md={product.image && product.image.length > 0 ? 5 : 6}>
              <Card className="p-2">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: proImage,
                    },
                    largeImage: {
                      src: proImage,
                      width: 1200,
                      height: 1800,
                    },
                  }}
                  style={{ zIndex: "999" }}
                />
              </Card>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.count > 0 ? "in Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      style={{ width: "100%" }}
                      onClick={addToCartHadler}
                    >
                      ADD To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <h2>Related Products</h2>
            {loadingProductList && <Loader />}
            {errorProductList && (
              <Message variant="danger">{errorProductList}</Message>
            )}
            <Col md={12}>
              <ProductSlider>
                {relatedProduct &&
                  relatedProduct.map((product) => (
                    <Product
                      product={product}
                      maximum={"200px"}
                      minimum={"200px"}
                    />
                  ))}
              </ProductSlider>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No review</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="3">3-Good</option>
                          <option value="4">4-Very Good</option>
                          <option value="5">5-Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign in</Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
