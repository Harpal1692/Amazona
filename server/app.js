const express = require("express");
const Productcontroller = require("./Products/Productcontroller");
const cors = require("cors");
const connectDb = require("./Connection");
const usercontroller = require("./User/UserController");
const env = require("dotenv");
const ordercontroller = require("./Order/OderController");
const auth = require("./Auth/Auth");
const AdminRouter = require("./ADMIN/AdminRouter");

env.config();
connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "success" });
});

// app.get("/api/product/InsertMany", Productcontroller.InsertProduct);

app.get("/api/product", Productcontroller.getproduct);

app.get("/api/product/:id", Productcontroller.getproductbyid);

app.get("/order",auth.Orderauth,ordercontroller.getorder);

app.get("/order/:id",auth.Orderauth, ordercontroller.getorderbyid);

app.post("/payment/verify", ordercontroller.verifypayment);

app.post("/api/user", usercontroller.InsertUser);

app.post("/login", usercontroller.UserLogin);

app.post("/register", usercontroller.userRegister);

app.post("/cart", Productcontroller.getcart);

app.use("/admin" , AdminRouter)

app.post("/create/order",auth.Orderauth ,ordercontroller.createOrder );

app.listen(6001, () => {
  console.log("server stared");
});
