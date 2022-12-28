import Header from "./component/Header";
import Footer from "./component/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom'
import ProductScreen from "./Screen/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />}></Route>
            <Route path="/product/:id"  element={<ProductScreen />}></Route>
          </Routes>          
        </Container>        
      </main>
      <Footer />
      </Router>
  );
};

export default App;
