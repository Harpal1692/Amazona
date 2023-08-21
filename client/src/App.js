import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./components/Screens/Homescreen";
import ProductScreen from "./components/Screens/ProductScreen";
import Login from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import { useState } from "react";
import Cart from "./components/Screens/CartScreen";
import ShippingScreen from "./components/Screens/ShippingScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import PlaceorderScreen from "./components/Screens/PlaceorderScreen";

function App() {
  const [userInfo, setUserinfo] = useState(
    JSON.parse(localStorage.getItem("userinfo") || "{}")
  );
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [cartItems, setcartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  // console.log(cartItems);

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          setcartItems={setcartItems}
          cartItems={cartItems}
          setUserinfo={setUserinfo}
          setToken={setToken}
          userinfo={userInfo}
          token={token}
        />
        <main style={{ minHeight: "829px" }} className="main">
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route
              path="/product/:id"
              element={
                <ProductScreen
                  setcartItems={setcartItems}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setUserinfo={setUserinfo} setToken={setToken} />}
            />
            <Route
              path="/register"
              element={
                <RegisterScreen setUserinfo={setUserinfo} setToken={setToken} />
              }
            />
            <Route
              path="/Addtocart"
              element={
                <Cart setcartItems={setcartItems} cartItems={cartItems} />
              }
            />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route
              path="/paymentmethod"
              element={
                <PaymentScreen
                  setcartItems={setcartItems}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/placeorder"
              element={
                <PlaceorderScreen
                  setcartItems={setcartItems}
                  cartItems={cartItems}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
