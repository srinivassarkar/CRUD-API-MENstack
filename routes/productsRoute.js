const router = require("express").Router();
const productController = require("../controllers/productsController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/category/:categoryId", productController.getProductByCategory);
router.put("/:id", productController.upDateProductById);
router.delete("/:id", productController.deleteProductById);

module.exports = router;
