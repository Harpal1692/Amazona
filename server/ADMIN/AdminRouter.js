const express = require("express")
const mediaController = require("./Media/MediaController")
const adminUserController = require("./AdminUser/AdminUserController")
const fileUpload = require("express-fileupload")
const productController = require("./Products/ProductController")

const AdminRouter = express.Router()


AdminRouter.use(fileUpload())

AdminRouter.post("/upload", mediaController.GetMedia)

AdminRouter.post("/adduser", adminUserController.CreateAdminUser)

AdminRouter.post("/login", adminUserController.AdminLogin)

AdminRouter.get("/getuser", adminUserController.GetAdminUser)

AdminRouter.delete("/dltuser/:id", adminUserController.DeleUser)

AdminRouter.put("/upuser/:id", adminUserController.UpdateUser)


AdminRouter.get("/showmedia", mediaController.ShowMedia)

AdminRouter.post("/insertproduct", productController.InsertProducts)

module.exports = AdminRouter

