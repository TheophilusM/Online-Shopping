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

<<<<<<< HEAD
productRoutes.route("/all").get(getAllProducts);

productRoutes
  .route("/:id")
  .get(getProduct)
=======
productRoutes.route("/all").get(protectHandler, getAllProducts);

productRoutes
  .route("/:id")
  .get(protectHandler, getProduct)
>>>>>>> 7b71d15be9e855dd696586395206473a44a585c1
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
