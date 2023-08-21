const UserModel = require("./UserModel");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const userModel = require("./UserModel");
const Validator = require("./Validation");

class UserController {
  async InsertUser(req, res) {
    try {
      const Password = bcrypt.hashSync(req.body.password, 8);

      console.log(Password);
      if (!Password) {
        return res.status(500).send({ message: "Something went wrong" });
      }

      let result = await UserModel.create({ ...req.body, password: Password });
      if (!result) {
        return res.status(500).send({ message: "Something went wrong" });
      }
      result = result._doc;
      delete result.password;
      return res.status(200).send({ message: "success", user: result });
    } catch (error) {
      if (error && error.code && error.code === 11000) {
        return res.status(400).send({ message: "email Allready exist" });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async UserLogin(req, res) {
    try {
      const { email, password } = req.body;

      const validationResult = Validator(req.body, "login");

      if (validationResult > 0) {
        return res
          .status(400)
          .send({ message: "Validation error", errors: validationResult });
      }

      let result = await userModel.findOne({ email: email });
      if (!result)
        return res
          .status(400)
          .send({
            message: "email not exist",
            errors: [{ key: "email", message: "Email is not Exist" }],
          });
      result = result._doc;

      if (!bcrypt.compareSync(password, result.password)) {
        return res
          .status(400)
          .send({
            message: "email and password are not matched",
            errors: [
              {
                key: "password",
                message: "Email and password are not matched",
              },
            ],
          });
      }

      delete result.password;

      const token = Jwt.sign(result, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });
      if (!token)
        return res.status(500).send({ message: "something went wrong" });
      return res
        .status(200)
        .send({ message: "success", userinfo: result, token: token });
    } catch (error) {
      console.log(error);
    }
  }

  async userRegister(req, res) {
    try {
      const { password } = req.body;

      const validationResult = Validator(req.body,"register")

      if (validationResult>0) {
        return res.status(400).send({message:"Validation error",errors:validationResult})
      }

      const enpassword = bcrypt.hashSync(password, 8);
      if (!enpassword)
        return res.status(500).send({ message: "Something went wrong" });

      req.body.password = enpassword;
      let result = await userModel.create(req.body);
      if (!result)
        return res.status(500).send({ message: "Something went wrong" });

      result = result._doc;
      delete result.password;

      const token = Jwt.sign(result, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });

      if (!token)return res.status(500).send({ message: "Something went wrong" });
      return res.status(200).send({ message: "success", userinfo: result, token: token });
    } catch (error) {
      console.log(error);
      if (error && error.code == 11000)
        return res.status(400).send({ message: "Email Allready Exist" });
        console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

const usercontroller = new UserController();

module.exports = usercontroller;
