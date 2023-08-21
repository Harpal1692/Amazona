import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckOutSteps";

export default function PaymentScreen() {
  
  let [PaymentMethod, setPaymentMethod] = useState("COD");
  console.log(PaymentMethod);
  const navigate = useNavigate();

  const OrderNow = () => {
    navigate(`/placeorder?paymentmethod=${PaymentMethod}`);
    return;
  };

  return (
    <>
      <div className="container pt-5 pb-3">
        <CheckoutSteps signin={true} shipping={true} payment={true} />
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <div className="shadow rounded p-3 mt-5">
              <h3
                className="fw-bold text-center mb-3"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#ffc107",
                }}
              >
                amazona
              </h3>
              <div className="row pt-4">
                <div className="col-12 pb-4 justify-content-center gap-3 d-flex">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      id="online"
                      checked={PaymentMethod === "online"}
                      value={"online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      style={{ fontSize: "1.1rem" }}
                      className="fw-bold"
                      htmlFor="online"
                    >
                      Online
                    </label>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      id="cod"
                      checked={PaymentMethod === "cod"}
                      value={"cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      style={{ fontSize: "1.1rem" }}
                      className="fw-bold"
                      htmlFor="cod"
                      onChange={() => setPaymentMethod("cod")}
                    >
                      Case on Delivary
                    </label>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <center>
                    <button
                      onClick={OrderNow}
                      className="btn btn-warning fw-bold bg-gradient"
                    >
                      Checkout
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
