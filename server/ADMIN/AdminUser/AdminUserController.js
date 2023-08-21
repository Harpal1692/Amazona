const Validation = require("../../User/Validation");
const adminUserModel = require("./AdminUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("../../User/Validation");

class AdminUserController {
  async CreateAdminUser(req, res) {
    try {
      let user = req.body;

      const ValidationResult = Validator(req.body, "AdminUser");

      if (ValidationResult.length > 0) {
        return res
          .status(400)
          .send({
            message: "Validation Error",
            ValidationResult: ValidationResult,
          });
      }

      const EncodePassword = bcrypt.hashSync(user.password, 8);

      if (!EncodePassword) {
        return res.status(500).send({ message: "Somthing Went Wrong" });
      }
      user.password = EncodePassword;

      const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });

      if (!token)
        return res.status(500).send({ message: "Somthing Went Wrong" });

      user = { ...user, token: token };

      const result = await adminUserModel.create(user);

      if (!result)
        return res.status(400).send({ message: "Somthing Went Wrong" });

      user = result._doc;

      delete user.password;

      return res
        .status(200)
        .send({ message: "Success", user: { ...user, token: token } });
    } catch (error) {
      console.log(error);
      if (error && error.message && error.message.includes("E11000")) {
        return res
          .status(400)
          .send({
            message: "Valiodation Error",
            ValidationResult: [{ key: "email", message: "email Alredy Exist" }],
          });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }


  async AdminLogin(req, res) {
    try {
      const { email, password } = req.body;

      const ValidationResult = Validator(req.body, "login");

      if (ValidationResult.length > 0) {
        return res.status(400).send({ message: "Validation Error" });
      }

      let user = await adminUserModel.findOne({ email: email });

      if (!user)
        return res
          .status(400)
          .send({
            message: "Validation Error",
            ValidationResult: [{ key: "email", message: "Email Not Found" }],
          });

      user = user._doc;

      if (!bcrypt.compareSync(password, user.password))
        return res
          .status(400)
          .send({
            message: "Validation Error",
            ValidationResult: [
              { key: "password", message: "Password Is Not Match" },
            ],
          });

      const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });

      delete user.password;

      if (!token) return res.status({ message: "Somthing Went Wrong" });

      return res
        .status(200)
        .send({ message: "Success", user: { ...user, token: token } });
    } catch (error) {
      console.log(error);
      return res.status(200).send({ message: "Internal Server Error" });
    }
  }

  async GetAdminUser(req, res) {
    try {
      const result = await adminUserModel.find({});

      if (!result)
        return res.status(400).send({ message: "Somthing Wetn Wrog" });

      return res.status(200).send({ message: "Success", user: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async DeleUser(req, res) {
    try {
      const { id } = req.params;
      const result = await adminUserModel.deleteOne({ _id: id });
      if (result) return res.status(200).send({ message: "Success", result });
      return res.status(400).send({ message: "Somthing Went Wrong" });
    } catch (error) {
      return res.status(400).send({ message: "Internal Server Error" });
    }
  }

  async UpdateUser(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const result = await adminUserModel.updateOne({ _id: id }, body);
      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        return res.status(200).send({ message: "Success", result });
      }
      return res.status(400).send({ message: "Somthing Wentn Wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Interbal Server Error" });
    }
  }
}

const adminUserController = new AdminUserController();
module.exports = adminUserController;
