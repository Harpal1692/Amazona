const Razorpay = require("razorpay");
const ordermodel = require("./orderModel");

function createRazorpayorder(options) {
  return new Promise((resolve, reject) => {
    var instance = new Razorpay({
      key_id: process.env.API_KEY,
      key_secret: process.env.API_SECRAT,
    });

    instance.orders.create(options, (error, order) => {
      if (error) return reject(error);
      resolve(order);
    });
  });
}

class OrderController {
  createOrder = async (req, res) => {
    try {
      const { products, userinfo, shippingaddress, paymentmethod, totalprice } =
        req.body;

      if (!products || products.length <= 0) {
        return res.status(400).send({ message: "Missing depenedcy Products" });
      }

      if (!userinfo) {
        return res.status(400).send({ message: "Missing depenedcy userinfo" });
      }

      if (!shippingaddress) {
        return res
          .status(400)
          .send({ message: "Missing depenedcy shippingaddress" });
      }

      let Deliveryin = new Date();
      Deliveryin.setDate(Deliveryin.getDate() + 5);

      let orderdetails = {
        products: products,
        user: userinfo,
        address: shippingaddress,
        paymentmethod: paymentmethod,
        totalprice: totalprice,
        Deliveryin: Deliveryin,
      };

      let order = await ordermodel.create(orderdetails);
      console.log(order);

      order = { ...order._doc, RazorpayDetails: null };
      if (paymentmethod === "cod") {
        if (!order) {
          return res.status(500).send({ message: "Something went wrong" });
        }
        return res.status(200).send({ message: "success", order });
      } else {
        const options = {
          amount: totalprice * 100,
          currency: "INR",
          receipt: "receipt_id_" + order._id,
        };
        const Razorpayresult = await createRazorpayorder(options);

        if (!Razorpayresult) {
          return res.status(500).send({ message: "Something went wrong" });
        }
        order = {
          ...order,
          RazorpayDetails: { ...Razorpayresult, apikey: process.env.API_KEY },
        };
      }
      return res.status(200).send({ message: "success", order });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  async getorder(req, res) {
    try {
      const result = await ordermodel.find({
        "user._id": req.body.userinfo._id,
      });
      if (result) {
        return res.status(200).send({ message: "success", result });
      }
      return res.status(500).send({ message: "Something went wrong" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  getorderbyid = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "Bad request!!" });
      }
      const result = await ordermodel.findById({ _id: id });
      if (result) {
        return res.status(200).send({ message: "suceess", product: result });
      }
    } catch (error) {
      // console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  verifypayment = async (req, res) => {

    try {
      const { orderid, Razorpayorderid, paymentid } = req.body;
      const instance = new Razorpay({
        key_id: process.env.API_KEY,
        key_secret: process.env.API_SECRAT,
      });
      
      const result = await instance.payments.fetch(paymentid);
      if (result.status === "authorized" || result.status === "captured") {
        let update = await ordermodel.updateOne(
          { _id: orderid },
          { paymentstatus: "verify" }
        );
        if (!update || update.modifiedCount <= 0) {
          return res.status(500).send({ message: "something went wrong" });
        }
        return res
          .status(200)
          .send({
            message: "success",
            orderid: orderid,
            Razorpayorderid: Razorpayorderid,
          });
      }
      const update = await ordermodel.updateOne(
        { _id: orderid },
        { paymentstatus: "rejected" }
      );
      if (!update || update.matchedCount <= 0) {
        return res.status(500).send({ message: "something went wrong" });
      }
      return res.status(400).send({ message: "Payment verification failed" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };
}

const ordercontroller = new OrderController();

module.exports = ordercontroller;
