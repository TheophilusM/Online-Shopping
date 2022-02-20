const express = require("express");
const productRoutes = express.Router();

const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const { protectHandler } = require("../middleware/authMiddleware");

productRoutes
  .route("/")
  .get(protectHandler, getProducts)
  .post(protectHandler, addProduct);

productRoutes.route("/all").get(protectHandler, getAllProducts);

productRoutes
  .route("/:id")
  .get(protectHandler, getProduct)
  .put(protectHandler, updateProduct)
  .delete(protectHandler, deleteProduct);

{
  /*
    shoppingRoutes.get("/", getProducts);
    
    shoppingRoutes.post("/", addProduct);
    
    shoppingRoutes.put("/:id", updateProduct);
    
    shoppingRoutes.delete("/:id", deleteProduct);
 */
}

{
  /*
    shoppingRoutes.get("/", (req, res) => {
      res.status(200).json({ message: "Get Products" });
    });
*/
}

module.exports = productRoutes;
