import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../action/userAction';

const Header = () => {
  const dispatch = useDispatch ();
  const {userInfo} = useSelector (state => state.userLogin);

  const logoutHandler = () => {
    dispatch (logout ());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Nav>
            <Link to="/">
              <Navbar.Brand>ProShop </Navbar.Brand>
            </Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink
              className="ms-auto"
              to="/cart"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-shopping-cart" />Cart
              </NavLink>
              {userInfo
                ? <><i className="fas fa-user"  style={{marginLeft:"10px",color: '#ffffff',}}/><NavDropdown title={userInfo.name} id="basic-nav-dropdown" style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  
                }}>
                    <NavDropdown.Item>
                      <Link to="/profile" >User Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  </>
                : <Nav>
                  <Link
                    to="/login"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    <i className="fas fa-user" /> Sign In
                    </Link>
                  </Nav>}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
