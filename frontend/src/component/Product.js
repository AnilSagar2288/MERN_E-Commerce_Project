import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../component/Rating";

const Product = ({ product, maximum, minimum, headingType }) => {
  return (
    <Card className="my-3 p-3 rounded" key={product._id}>
      <Link to={`/products/${product._id}`}>
        <div
          style={{
            maxHeight: maximum,
            minHeight: minimum,
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Card.Img
            style={{
              maxHeight: maximum,
              minHeight: minimum,
              overflow: "hidden",
            }}
            src={product.thumbnail}
            variant="top"
            alt={product.name}
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title
            as="div"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <OverlayTrigger
              overlay={<Tooltip placement="top">{product.name}</Tooltip>}
            >
              <strong>{product.name}</strong>
            </OverlayTrigger>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as={headingType} className="mt-2">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
