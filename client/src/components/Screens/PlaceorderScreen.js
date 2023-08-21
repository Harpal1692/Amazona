import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apihelper from "../ApiHelper";
import LoadRazorpay from "../Common/LoadRazorpay";

export default function PlaceorderScreen(props) {
  let { cartItems, setcartItems } = props;
  const [cart, setcart] = useState([]);
  const [SummaryDetails, setSummaryDetails] = useState({
    totalAmount: 0,
    delivery: 0,
    totalitem: 0,
  });
  
  const location = useLocation();
  const navigate = useNavigate()
  const paymentMethod = location.search.split("paymentmethod=")[1];
  let userInfo = JSON.parse(localStorage.getItem("userinfo" || "[]"));

  useEffect(() => {
    // eslint-disable-next-line
    cartItems = JSON.parse(localStorage.getItem("cartItems" || []));
    setcartItems(cartItems);
  }, []);
  console.log(paymentMethod)
  const PlaceOrder = async () => {
    try {

      const userinfo = JSON.parse(localStorage.getItem("userinfo") ||"[]")
      const product = cart.map(({_id,quantity,price})=>({_id,quantity,price}))

      const orderdetail = {
        products:product,
        userinfo:userinfo,
        paymentmethod:paymentMethod,
        shippingaddress:userinfo.address,
        totalprice:SummaryDetails.totalAmount
      }

      const result = await apihelper.placeorder(orderdetail)
      console.log(result);
      setcartItems([])

      if (!result.data.order.RazorpayDetails) {
        return navigate("/placeorder/"+result.data.order._id)
      }
      else{
        const data = result.data.order
        console.log(data);  

        const option = {
          name:data.address.FullName,
          phone:data.address.Phone,
          address:data.address.address,
          apikey:data.RazorpayDetails.apikey,
          amount:data.RazorpayDetails.amount,
          currency:data.RazorpayDetails.currency,
          razorpayorderid:data.RazorpayDetails.id,
          orderid:data._id,
          navigate:navigate
        }
        LoadRazorpay(option)
      }


    } catch (error) {
      console.log(error);
    }
  };

  const getcart = async () => {
    try {
      const id = cartItems.map((x) => x.product);

      const result = await apihelper.fetchCart(id);
      console.log(result);

      const instockitem = result.data?.result;

      let i = 0;
      while (i < cartItems.length) {
        let j = 0;
        while (j < instockitem.length) {
          if (cartItems[i].product === instockitem[j]._id) {
            instockitem[j].quantity = cartItems[i].quantity;
          }
          j++;
        }
        i++;
      }
      setcart(instockitem);
    } catch (error) {
      setcart([]);
      console.log(error);
    }
  };
  useEffect(() => {
    getcart();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let i = 0;
    let totalprice = 0;
    let totalItem = 0;
    let totalProducts = 0;

    while (i < cart.length) {
      if (cart[i].countInstock > 0) {
        totalItem += cart[i].quantity;
        totalprice += cart[i].quantity * cart[i].price;
        totalProducts++;
      }
      i++;
    }

    setSummaryDetails({
      ...SummaryDetails,
      totalitem: totalItem,
      totalAmount: totalprice,
      totalProducts: totalProducts,
    });
    // eslint-disable-next-line
  }, [cart]);
  //   console.log(cart);
  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <h3 className="fw-normal">Review Your Order</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 mb-3">
            <div className="shadow p-3 rounded-2">
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <h5 className="fw-bold">Shipping Information</h5>
                  <hr />
                  <p className="mb-0" style={{ fontSize: "1.1rem" }}>
                    Customer Name
                  </p>
                  <span>{userInfo.address.FullName},</span>
                  <br />
                  <span>{userInfo.address.address}</span> <br />
                  <span>
                    {userInfo.address.City}, {userInfo.address.State} ,
                    {userInfo.address.Pincode}
                  </span>{" "}
                  <br />
                  <span>Phone: {userInfo.address.Phone}</span> <br />
                </div>
                <div className="col-12 col-md-6">
                  <h5 className="fw-bold">Payment Information</h5>
                  <hr />
                  <p className="mb-0" style={{ fontSize: "1.1rem" }}>
                    Payment Method:
                    <span
                      className="fw-bold"
                      style={{ fontSize: "0.9rem", color: "#b12704" }}
                    >
                      {" "}
                      {paymentMethod.toUpperCase()}{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow p-3 rounded-2 mt-4">
              <h5
                className="fw-bold mb-3"
                style={{ textDecoration: "underline" }}
              >
                Order Information
              </h5>
              <div className="row">
                <div className="col-12">
                  {cart.map((x, index) => {
                    return (
                      <div key={index}>
                        <div className="row">
                          <div className="col-md-3 col-5">
                            <Link className={"link"} to={`/product/${x._id}`}>
                              <img src={x.image} width={"100%"} alt={x.name} />
                            </Link>
                          </div>
                          <div className="col-md-9 col-7">
                            <Link className={"link"} to={`/product/${x._id}`}>
                              <h6 className="fw-bold">{x.name}</h6>
                            </Link>
                            <p className="mb-1">Brand: {x.brand}</p>
                            <p className="mb-1">Category: {x.category}</p>
                            <p className="mb-1">Quontity: {x.qty}</p>
                            <p className="mb-1">
                              Price:{" "}
                              <span
                                className="fw-bold"
                                style={{ color: "#b12704" }}
                              >
                                ${x.price}
                              </span>
                            </p>
                          </div>
                        </div>
                        {index < cart.length - 1 && <hr className="mt-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="m-0 fw-bold">Order Summary</h5>
              </div>
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Items:</p>
                  <p className="mb-1">${SummaryDetails.totalAmount}.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Delivery:</p>
                  <p className="mb-1">${SummaryDetails.delivery}.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Total:</p>
                  <p className="mb-1">${SummaryDetails.totalAmount}.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-1">Discount:</p>
                  <p className="mb-1">-${0}.00</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-5 fw-bold">Order Total:</p>
                  <p className="fs-5 fw-bold" style={{ color: "#b12704" }}>
                    ${SummaryDetails.totalAmount}.00
                  </p>
                </div>
                <button
                  onClick={PlaceOrder}
                  className="shadow border-secondary btn btn-warning w-100 bg-gradient"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
