import React, { useState } from "react";
import CheckoutSteps from "./CheckOutSteps";
import Validator from "../Common/Validation";
import Input from "../Common/Input";
import { useNavigate } from "react-router-dom";

export default function ShippingScreen() {
  const [shippingerror, setshippingerror] = useState([]);
  const [issubmited, setissubmited] = useState(false);

  const navigate = useNavigate()

  const [Address, setAddress] = useState({
    FullName: "",
    address: "",
    Phone: "",
    City: "",
    State: "",
    email: "",
    Pincode: "",
  });

  const addressHandler = () => {
    try {
      setissubmited(true);
      const validationresult = Validator(Address, "shipping");
      console.log(validationresult);
      if (validationresult.length > 0) {
        setshippingerror(validationresult);
      }
      const userinfo = JSON.parse(localStorage.getItem("userinfo"|| "{}"))
      userinfo.address = Address
      localStorage.setItem("userinfo",JSON.stringify(userinfo))
      navigate("/paymentmethod")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container pt-4">
        <CheckoutSteps signin={true} shipping={true} />
      </div>
      <div className="container ">
        <form className="row g-3 mt-5 needs-validation">
          <div className="col-md-12">
            <label className="form-label">FullName</label>
            <div className="Input-group has-validation">
              <Input
                isError={
                  shippingerror.find((x) => x.key === "FullName") ? true : false
                }
                helperText={
                  shippingerror.find((x) => x.key === "FullName")?.message
                }
                value={Address.FullName}
                onChange={(e) => {
                  setAddress({ ...Address, FullName: e.target.value });
                  if (issubmited) {
                    const validationresult = Validator(
                      { ...Address, FullName: e.target.value },
                      "shipping"
                    );
                    setshippingerror(validationresult);
                  }
                }}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <Input
            isError={
              shippingerror.find((x) => x.key === "address") ? true : false
            }
            helperText={
              shippingerror.find((x) => x.key === "address")?.message
            }
            value={Address.address}
            onChange={(e) => {
              setAddress({ ...Address, address: e.target.value });
              if (issubmited) {
                const validationresult = Validator(
                  { ...Address, address: e.target.value },
                  "shipping"
                );
                setshippingerror(validationresult);
              }
            }}
              type="text"
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile No:</label>
            <Input
             isError={
              shippingerror.find((x) => x.key === "Phone") ? true : false
            }
            helperText={
              shippingerror.find((x) => x.key === "Phone")?.message
            }
            value={Address.Phone}
            onChange={(e) => {
              setAddress({ ...Address, Phone: e.target.value });
              if (issubmited) {
                const validationresult = Validator(
                  { ...Address, Phone: e.target.value },
                  "shipping"
                );
                setshippingerror(validationresult);
              }
            }}
              type="tel"
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <Input
             isError={
              shippingerror.find((x) => x.key === "email") ? true : false
            }
            helperText={
              shippingerror.find((x) => x.key === "email")?.message
            }
            value={Address.email}
            onChange={(e) => {
              setAddress({ ...Address, email: e.target.value });
              if (issubmited) {
                const validationresult = Validator(
                  { ...Address, email: e.target.value },
                  "shipping"
                );
                setshippingerror(validationresult);
              }
            }}
              type="text"
              placeholder="Example@gmail.com"
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <Input
             isError={
              shippingerror.find((x) => x.key === "City") ? true : false
            }
            helperText={
              shippingerror.find((x) => x.key === "City")?.message
            }
            value={Address.City}
            onChange={(e) => {
              setAddress({ ...Address, City: e.target.value });
              if (issubmited) {
                const validationresult = Validator(
                  { ...Address, City: e.target.value },
                  "shipping"
                );
                setshippingerror(validationresult);
              }
            }}
              type="text"
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">State</label>
            <select className="form-select" id="validationCustom04" required>
              <option>Choose...</option>
              <option>Gujarat</option>
              <option>Jugadi</option>
              <option>Up</option>
              <option>Delhi</option>
              <option>Bombey</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Pin Code</label>
            <Input
               isError={
                shippingerror.find((x) => x.key === "Pincode") ? true : false
              }
              helperText={
                shippingerror.find((x) => x.key === "Pincode")?.message
              }
              value={Address.Pincode}
              onChange={(e) => {
                setAddress({ ...Address, Pincode: e.target.value });
                if (issubmited) {
                  const validationresult = Validator(
                    { ...Address, Pincode: e.target.value },
                    "shipping"
                  );
                  setshippingerror(validationresult);
                }
              }}
            type="text" className="form-control" required />
          </div>

          <div className="col-12 mt-5">
            <button
              onClick={addressHandler}
              className="btn btn-outline-warning  mb-3"
              type="button"
            >
              Order Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
