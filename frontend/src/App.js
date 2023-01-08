import Header from "./component/Header";
import Footer from "./component/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentMethodScreen from "./Screen/PaymentMethodScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import OrderScreen from "./Screen/OrderScreen";
import UserListScreen from "./Screen/UserListScreen";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        {/* <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        > */}
        <Container>
          <Routes>
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
        {/* </ToastContainer> */}
      </main>
      <Footer />
    </Router>
  );
};

export default App;
