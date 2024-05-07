import Product from "../Modal/Product.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";


class ProductController {
    //get product
    getProduct = async (req, res) => {
        const { pid } = req.body;
        try {
            const product = await Product.findOne({ _id: pid })
            if (!product) return response(res, 404, ResTypes.errors.no_product)
            return response(res, 200, { ...ResTypes.successMessages.success, product })
        } catch (error) {
            console.log(error)
            return response(res, 500, error)
        }
    }
    // Get all products
    getAllProducts = async (req, res) => {
        try {
            const products = await Product.find({});
            if (products) {
                return response(res, 200, { ...ResTypes.successMessages.success, products });
            } else {
                return response(res, 404, ResTypes.errors.no_product);
            }
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
    //add product
    addProduct = async (req, res) => {
        const { name, price, description, category, stocks } = req.body;
        try {
            // Create a new product instance
            const newProduct = new Product({
                name,
                price,
                description,
                category,
                stocks
            });

            // Save the new product to the database
            const savedProduct = await newProduct.save();

            // Respond with success message and the saved product
            return response(res, 200, { ...ResTypes.successMessages.success, product: savedProduct });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
}

export default ProductController = new ProductController()