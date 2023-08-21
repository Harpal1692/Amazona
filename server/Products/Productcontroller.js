const productModel = require("./ProductModel");

// const Products = [
//   {

//     name: "Nike Slim Shirt",
//     alias: "Nike Slim Shirt",
//     category: "Shirts",
//     image: "/image/p1.jpg",
//     price: 120,
//     brand: "Nike",
//     rating: 4.5,
//     countInstock: 1,
//     numReviews: 10,
//     description: "high quality product",
//   },
//   {
//     name: "Adidas Fit Shirt",
//     alias: "Adidas Fit Shirt",
//     category: "Shirts",
//     image: "/image/p2.jpg",
//     price: 100,
//     brand: "Adidas",
//     rating: 4.0,
//     countInstock: 10,
//     numReviews: 10,
//     description: "high quality product",
//   },
//   {
//     name: "Lacoste Free Shirt",
//     alias: "Lacoste Free Shirt",
//     category: "Shirts",
//     image: "/image/p3.jpg",
//     price: 220,
//     brand: "Lacoste",
//     rating: 4.8,
//     countInstock: 7,
//     numReviews: 17,
//     description: "high quality product",
//   },
//   {
//     name: "Nike Slim Pant",
//     alias: "Nike Slim Pant",
//     category: "Pants",
//     image: "/image/p4.jpg",
//     price: 78,
//     brand: "Nike",
//     rating: 4.5,
//     countInstock: 0,
//     numReviews: 14,
//     description: "high quality product",
//   },
//   {
//     name: "Puma Slim Pant",
//     alias: "Puma Slim Pant",
//     category: "Pants",
//     image: "/image/p5.jpg",
//     price: 65,
//     brand: "Puma",
//     rating: 4.5,
//     countInstock: 3,
//     numReviews: 10,
//     description: "high quality product",
//   },
// ];

class productcontroller {
  // async InsertProduct(req ,res){
  //   try {
  //     const result = await productModel.insertMany(Products)
  //     if (result) {
  //       return res.status(200).send({message:"success",product : result})
  //     }
  //     return res.status(500).send({message:"Something went wrong"})
  //   } catch (error) {
  //     return res.status(500).send({message:"Internal server error"})

  //   }
  // }

  async getproductbyid(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(200).send({ message: "products not found" });
      }
      const result = await productModel.findById({ _id: id });
      if (result)
        return res.status(200).send({ message: "success", product: result });
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async getproduct(req, res) {
    try {
      const products = await productModel.find({});
      if (products) {
        return res.status(200).send({ message: "Success", products: products });
      }
      return res.status(500).send({ message: "Somthing went wrong" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async getcart(req, res) {
    try {
      const { products } = req.body;
      // console.log(products);

      if (!products)
        return res.status(400).send({ message: "missing dependency products" });

      const result = await productModel
        .find({ _id: products })
        .select([
          "name",
          "price",
          "countInstock",
          "brand",
          "category",
          "image",
          "_id",
        ]);
      console.log(result);
      if (!result) {
        return res.status(500).send({ message: "something went wrong " });
      }

      return res.status(200).send({ message: "success", result: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

const Productcontroller = new productcontroller();

module.exports = Productcontroller;
