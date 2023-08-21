import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Zoom from "react-img-zoom";
import "./ProductScreen.css";
import Rating from "../Rating";
import apihelper from "../ApiHelper";

export default function ProductScreen(props) {
  let { cartItems, setcartItems } = props;
  const { id } = useParams();
  const [products, setproduct] = useState({});
  const [quantity, setquantity] = useState(1);

  // console.log(cartItems);
  const naviagate = useNavigate();

  const addtocart = async () => {
    try {
      // console.log(cartItems);
      const cart = {
        product: id,
        quantity: quantity,
      };
      const findIndex = cartItems.findIndex((x) => x.product === id);

      if (findIndex > -1) {
        cartItems[findIndex].quantity = cart.quantity;
      } else {
        console.log(cart);
        cartItems.push(cart);
      }

      setcartItems(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      naviagate("/Addtocart");
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.message);
      }
    }
  };

  const getproduct = async () => {
    try {
      const result = await apihelper.Getproducts(id);
      // console.log(result);
      setproduct(result.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      getproduct();
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="card-wrapper productScreen">
      <div className="card">
        {/* card left */}
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              {products.image ? (
                <Zoom
                  img={products.image}
                  zoomScale={2}
                  width={600}
                  height={600}
                />
              ) : (
                <p>no image available</p>
              )}
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="product-content">
          <h3 className="product-title">{products.name}</h3>
          <div className="d-flex justify-content-between conpniy_name">
            <Link to="/" className="product-link">
              {" "}
              {products.brand}
            </Link>
            <span className="float-right In_stock">
              {products.countInstock <= 0 ? (
                <p className="Out_stock">
                  <span>Out of stock</span> : Unavailable{" "}
                </p>
              ) : (
                <p className="In_stock">
                  <span>In stock</span> : Available
                </p>
              )}
            </span>
          </div>

          <div className="product-rating">
            <span>
              {" "}
              <Rating
                rating={products.rating}
                numReviews={products.numReviews}
              />
            </span>
          </div>
          <div className="product-price">
            <p className="last-price">
              Old Price: <span>Rs.{products.price + 100}</span>
            </p>
            <p className="new-price">
              New Price: <span>Rs.{products.price} (Lees -100)</span>
            </p>
          </div>
          <div className="product-detail">
            <h2>about this item: </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              eveniet veniam tempora fuga tenetur placeat sapiente architecto
              illum soluta consequuntur, aspernatur quidem at sequi ipsa!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.
            </p>
            <ul>
              <li>
                {" "}
                Color:
                <ul className="variant">
                  <li className="colors_iteam1"></li>
                  <li className="colors_iteam2"></li>
                  <li className="colors_iteam3"></li>
                  <li className="colors_iteam4"></li>
                </ul>
              </li>
              <li>
                {" "}
                Size :
                <ul className="variant">
                  <li>S</li>
                  <li>L</li>
                  <li>XL</li>
                  <li>2XL</li>
                  <li>3XL</li>
                </ul>
              </li>

              <li>
                {" "}
                Category:<span> {products.category}</span>
              </li>
              <li>
                {" "}
                Shipping Area:<span> All over the world</span>
              </li>
              <li>
                Shipping Fee:<span> Free</span>
              </li>
            </ul>
          </div>
          <div className="purchase-info">
            <label>
              {" "}
              Quantity:
              <input
                type="number"
                id="Quantity"
                min={0}
                max={products.stock}
                value={quantity}
                onChange={(e) => {
                  setquantity(Number(e.target.value));
                }}
              />
            </label>

            <button
              onClick={addtocart}
              disabled={products.countInstock <= 0}
              type="button"
              className="btn"
            >
              Add to Cart
            </button>
          </div>
          <div className="social-links">
            <p>Share At: </p>
            <Link to="##">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="##">
              <i className="bi bi-twitter" />
            </Link>
            <Link to="##">
              <i className="bi bi-instagram" />
            </Link>
            <Link to="https://wa.me/1XXXXXXXXXX" target="_blank">
              <i className="bi bi-whatsapp" />
            </Link>
            <Link to="##">
              <i className="bi bi-pinterest" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
