import { useEffect, useState } from "react";
import Productcard from "./../Productcard";
import apihelper from "../ApiHelper";

export default function Homescreen() {
  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    try {
      const result = await apihelper.fetProducts();
      setProducts(result.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div>
      <h3
        style={{
          paddingLeft: "19px",
          paddingTop: "18px",
          marginBottom: "-15px",
        }}
      >
        Feature Products
      </h3>
      <div className="container d-flex  py-4">
        <div className="row d-flex  justify-content-md-start justify-content-center  pt-3  gap-4 ">
          {products.map((product, index) => (
            <Productcard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
