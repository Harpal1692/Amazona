const AdminproductModel = require("./ProductModel")

class ProductController {

    async InsertProducts(req, res) {
        try {

            const { title, price, description, discount, countInStock, totalPrice, Brand, FeatureImages, RelevantImages, alias } = req.body

            if (!title) return res.status(400).send({ message: "Missing Dipendency Of Title" })
            if (!price) return res.status(400).send({ message: "Missing Dipendency Of Price" })
            if (!alias) return res.status(400).send({ message: "Missing Dipendency Of Alias" })
            if (!description) return res.status(400).send({ message: "Missing Dipendency Of description" })
            if (!discount) return res.status(400).send({ message: "Missing Dipendency Of Discount" })
            if (!countInStock) return res.status(400).send({ message: "Missing Dipendency Of CountInStock" })
            if (!totalPrice) return res.status(400).send({ message: "Missing Dipendency Of TotalPrice" })
            if (!Brand) return res.status(400).send({ message: "Missing Dipendency Of Brand" })
            if (!FeatureImages) return res.status(400).send({ message: "Missing Dipendency Of FeatureImages" })
            if (!RelevantImages) return res.status(400).send({ message: "Missing Dipendency Of RelevantImages" })

            const result = await AdminproductModel.AddProduct(req.body)

            if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })

            return res.status(200).send({ message: "Success", product: result })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}

const productController = new ProductController()
module.exports = productController