import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../action/userAction";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
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
            <SearchBox />

            {userInfo ? (
              <>
                <i
                  className="fas fa-user"
                  style={{ marginLeft: "10px", color: "#ffffff" }}
                />
                <NavDropdown
                  title={userInfo.name}
                  id="usermenu"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  <NavDropdown.Item>
                    <Link to="/profile">User Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav>
                <Link
                  to="/login"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  <i className="fas fa-user" /> Sign In
                </Link>
              </Nav>
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <i
                  className="fas fa-user"
                  style={{ marginLeft: "10px", color: "#ffffff" }}
                />
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  <NavDropdown.Item>
                    <Link to="/admin/userList">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/productList">Products</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/orderList">Orders</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <NavLink
              className="ms-auto"
              to="/cart"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <i className="fas fa-shopping-cart" />
              Cart
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
