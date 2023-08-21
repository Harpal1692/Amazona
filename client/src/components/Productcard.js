import React from 'react'
import '../components/Productcard.css'
import Rating from './Rating'
import { Link } from 'react-router-dom'

export default function Productcard({ product }) {
//   console.log(product)
  return (

    
      <div className='col'>
    <Link to={`/product/${product._id}`} >
        <div className="product-card" style={{width:"288px"}} >

            {/* <div className="badge">Hot</div> */}
            <div className="product-tumb">
                <img src={product.image} alt="" />
            </div>
            <div className="product-details">
                <span className="product-catagory">{product.category}</span>
                <h4><a href="##">{product.title}</a>
                </h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus
                    nostrum!
                </p>
                <div className="product-bottom-details">
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                    <div className="product-price">
                        <small>$96.00</small>${product.price}
                    </div>
                    <div className="product-links">
                        <a href='##'>
                            <i className="bi bi-cart-check-fill"></i>
                        </a>
                        <a href='##'>
                            <i className="bi bi-heart"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Link>
 </div>
     
    

  )
}
