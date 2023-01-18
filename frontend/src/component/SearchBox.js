import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {productSearchKeword} from '../action/productAction';

const SearchBox = () => {
  const {products} = useSelector (state => state.productList);
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const [keyword, setKeyword] = useState ('');
  

  const submitHandler = e => {
    e.preventDefault ();
    if (keyword.trim ()) {
      navigate (`/search/${keyword}`);
      dispatch(productSearchKeword(keyword))      
    } else {
      navigate ('/');      
    }
    setKeyword('')
  };

  const homeScreenDataHandler = (productId)=>{
    navigate(`/products/${productId}`)
    dispatch(productSearchKeword(""))
  }

  const searchData = products.filter (product =>product.name.match (new RegExp (keyword, 'ig')))
    

  // const getData = setTimeout (() => {
  //   const data = products.filter (product =>product.name.match (new RegExp (keyword, 'ig')))
  //   setSearchData(data)
  //   return () => clearTimeout (getData);
  // }, 5000);



  

  return (
    <div className="search-box-wrapper">
      <form onSubmit={submitHandler} style={{display: 'flex', flex: '1'}}>
        <input
          type="text"
          name="q"
          onChange={e => setKeyword (e.target.value)}
          className="mr-sm-2 ml-sm-5"
          placeholder="Search Products by Name..."
        />
        <button type="submit" variant="outline-success" className="p-2">
          <i className="fas fa-search" />
        </button>
      </form>
      {keyword && products.length > 0 && searchData
        ? <div className='scearch-content-wrapper'>
            {searchData && searchData.map((item)=> (
              <>
              <p key={item._id} onClick={()=>homeScreenDataHandler(item._id)}><i className='fas fa-search'></i>   {item.name}</p>
              </>
            )).slice(0,5)}
            {console.log("keyword",keyword)}
          </div>
        : null}
    </div>
  );
};

export default SearchBox;
