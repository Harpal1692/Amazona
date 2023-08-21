const { default: mongoose } = require("mongoose");

class Ordermodel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        user: { type: Object, required: true },
        address: { type: Object, required: true },
        products: { type: Array, required: true },
        paymentmethod: { type: String, required: true, default: "cod" },
        paymentstatus: { type: String, required: true, default: "Pending" },
        Deliverystatus: { type: String, required: true, default: "Pending" },
        totalprice: { type: Number, required: true },
        Deliveryin: { type: Date, required: true },
      },
      { timestamps: true }
    );
  }
}

const order = new Ordermodel();

const ordermodel = mongoose.model("tbl_order",order.schema)

module.exports = ordermodel;

