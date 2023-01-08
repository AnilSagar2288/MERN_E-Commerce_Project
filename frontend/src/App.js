import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import CartScreen from "./Screen/CartScreen";
import HomeScreen from "./Screen/HomeScreen";
import LoginScreen from "./Screen/LoginScreen";
import OrderScreen from "./Screen/OrderScreen";
import PaymentMethodScreen from "./Screen/PaymentMethodScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import ProductScreen from "./Screen/ProductScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import UserEditScreen from "./Screen/UserEditScreen";
import UserListScreen from "./Screen/UserListScreen";


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">        
        <Container>
          <Routes>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/userList" element={<UserListScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
          </Routes>
        </Container>

      </main>
      <Footer />
    </Router>
  );
};

export default App;
