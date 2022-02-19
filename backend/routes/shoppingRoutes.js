const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/shoppingController");

router.route("/").get(getProducts).post(addProduct);

router.route("/:id").put(updateProduct).delete(deleteProduct);

{
  /*
    router.get("/", getProducts);
    
    router.post("/", addProduct);
    
    router.put("/:id", updateProduct);
    
    router.delete("/:id", deleteProduct);
 */
}

{
  /*
    router.get("/", (req, res) => {
      res.status(200).json({ message: "Get Products" });
    });
*/
}

module.exports = router;
