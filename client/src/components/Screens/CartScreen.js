import React, { useEffect, useState } from "react";
import apihelper from "../ApiHelper";
import { useNavigate } from "react-router-dom";

export default function Cart(props) {
  let { cartItems, setcartItems } = props;
  const [cart, setcart] = useState([]);
  const navigate = useNavigate();

  const [SummaryDetails, setSummaryDetails] = useState({
    totalAmount: 0,
    totalItems: 0,
    totalProducts: 0,
    delivery: 0,
    text: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line
    cartItems = JSON.parse(localStorage.getItem("cartItems" || "[]"));
    setcartItems(cartItems);
  }, []);

  const getcart = async () => {
    try {
      const products = cartItems.map((x) => x.product);
      const result = await apihelper.fetchCart(products);
      console.log(result);

      const instockitems = result.data?.result;
      console.log(instockitems);
      let i = 0;

      while (i < cartItems.length) {
        let j = 0;
        while (j < instockitems.length) {
          if (cartItems[i].product === instockitems[j]._id) {
            instockitems[j].quantity = cartItems[i].quantity;
          }
          j++;
        }

        i++;
      }

      console.log(instockitems);

      setcart(instockitems);
    } catch (error) {
      console.log(error);
      setcart([]);
    }
  };

  useEffect(() => {
    getcart();
    // eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    let i = 0;
    let totalPrice = 0;
    let totalProducts = 0;
    let totalItems = 0;
    console.log(cart);

    while (i < cart.length) {
      if (cart[i].countInstock > 0) {
        totalPrice += cart[i].quantity * cart[i].price;
        totalItems += cart[i].quantity;
        totalProducts++;
      }
      i++;
    }
    setSummaryDetails({
      ...SummaryDetails,
      totalItems: totalItems,
      totalAmount: totalPrice,
      totalProducts: totalProducts,
    });
        // eslint-disable-next-line
  }, [cart]);

  const RemoveHandler = (id) => {
    cartItems = cartItems.filter((x) => x.product !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setcartItems(cartItems);
    getcart();
  };

  const CheckoutHandler = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login?redirect=shipping");
    }
    navigate("/shipping?redirect=payment");
    // localStorage.setIt/em("summaryinfo", JSON.stringify(SummaryDetails));
    // localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {" "}
            {cart.length <= 0 ? (
              <div className="container">
                <img
                  className="img-fluid"
                  src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
                  alt="##"
                ></img>
              </div>
            ) : (
              cart &&
              cart.map((product, key) => {
                return (
                  <div className="container py-3 px-4">
                    <div className="row">
                      <div className="col-12 col-md mb-2" key={key}>
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">Shopping Card</h5>
                          <span className="text-secondary">Price</span>
                        </div>
                        <hr className="my-2 mb-4 d-md-block" />
                        <div className="row shadow py-3 mb-4">
                          <div className="col-3 col-md-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              width={"100%"}
                              style={{ maxWidth: "150px" }}
                            />
                          </div>
                          <div className="col-9 col-md-10 d-flex justify-content-between">
                            <div className="w-100">
                              {/* link */}
                              <h6 className="fw-bold">{product.name}</h6>
                              <p className="mb-1">{product.brand}</p>
                              <p className="mb-1">{product.category}</p>

                              {/* <div className="d-flex gap-2 align-items-center">
                                <span>Quantity:</span>
                                <select
                                  className="bg-gradient bg-light rounded"
                                  style={{ minWidth: "70px" }} 
                                  value={product.quantity}
                                ></select>
                              </div> */}

                              <select
                                className="bg-gradient bg-light rounded"
                                style={{ minWidth: "70px" }}
                                disabled={product.countInstock <= 0}
                                value={product.quantity}
                                onChange={(e) => {
                                  cart[key].quantity = Number(e.target.value);
                                  setcart([...cart]);

                                  let tmp = cart.map((x) => {
                                    return {
                                      product: product._id,
                                      quantity: product.quantity,
                                    };
                                  });
                                  localStorage.setItem(
                                    "cartItems",
                                    JSON.stringify(tmp)
                                  );
                                }}
                              >
                                {[
                                  ...new Array(product.countInstock).keys(),
                                ].map((n) => (
                                  <option value={n + 1} key={n + 1}>
                                    {n + 1}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <span
                                className="fw-bold d-block text-end"
                                style={{ color: "#b12704" }}
                              >
                                {product.price}
                              </span>
                              <button
                                onClick={() => RemoveHandler(product._id)}
                                className="btn mt-2  btn-warning bg-gradient border-secondary"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="col-md-4 mt-3">
            <div className="col-12">
              <div className="card-header border-secondary border border-bottom-0">
                <h5 className="fw-bold">Summary</h5>
              </div>
              <div className="card-body border-secondary border">
                <div className="d-flex justify-content-between">
                  <h6>Total Products:</h6>
                  <span>{SummaryDetails.totalProducts}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>Total Items:</h6>
                  <span>{SummaryDetails.totalItems}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Total Amount:</h6>
                  <span>${SummaryDetails.totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">Subtotal:</h6>
                  <span className="fw-bold" style={{ color: "#b12704" }}>
                    ${SummaryDetails.totalAmount}
                  </span>
                </div>
                <center>
                  <button
                    disabled={cart.length <= 0}
                    onClick={CheckoutHandler}
                    className="w-100 btn btn-warning border-secondary bg-gradient"
                  >
                    Proccess to Checkout
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
