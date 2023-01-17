import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productSearchKeword } from "../action/productAction";

const SearchBox = ({ open }) => {
  const { products } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }

    const getData = setTimeout(() => {
      dispatch(productSearchKeword(keyword));
      return () => clearTimeout(getData);
    }, 2000);
  };

  return (
    <div className="search-box-wrapper">
      <form onSubmit={submitHandler} style={{ display: "flex", flex: "1" }}>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
          placeholder="Search Products by Name..."
        />
        <button type="submit" variant="outline-success" className="p-2">
          <i className="fas fa-search"></i>
        </button>
      </form>
      {keyword && products.length > 0 ? (
        <div>
          {products
            .slice(0, 5)
            .map((i) => i.name)
            .sort((a, b) => a.localeCompare(b))
            .map((i, index) => {
              return <p key={index}>{i}</p>;
            })}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
