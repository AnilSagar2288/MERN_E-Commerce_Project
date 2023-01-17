import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../action/productAction.js";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
import Product from "../component/Product.js";
import ProductSlider from "../component/ProductSlider.js";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  const allCategory = [...new Set(products.map((cat) => cat.category))].sort(
    (a, b) => a.localeCompare(b)
  );
  const { keyword } = useSelector((state) => state.searchKeyword);

  useEffect(() => {
    if (products && keyword) {
      const filterProductList = products.filter((product) =>
        product.name.match(new RegExp(keyword, "ig"))
      );
      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: filterProductList,
      });
    } else {
      dispatch(productListAction());
    }
  }, [keyword, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Carousel
            style={{
              maxHeight: "500px",
              minHeight: "500px",
              backgroundColor: "#999",
            }}
            indicators={false}
          >
            {products.map((item, i) => (
              <Carousel.Item key={i}>
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="d-block w-100"
                  style={{
                    maxHeight: "500px",
                    minHeight: "500px",
                    objectFit: "contain",
                  }}
                />
                <Carousel.Caption>
                  <h1>{item.name}</h1>
                  <p style={{fontSize:"25px"}}>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Container>
            {allCategory.map((heading, i) => (
              <div key={i}>
                <h1 className="mt-3">{heading}</h1>
                <ProductSlider>
                  {products
                    .filter((product) => product.category === heading)
                    .map((product) => (
                      <Product
                        product={product}
                        maximum={"200px"}
                        minimum={"200px"}
                        headingType={"h4"}
                      />
                    ))}
                </ProductSlider>
              </div>
            ))}
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
