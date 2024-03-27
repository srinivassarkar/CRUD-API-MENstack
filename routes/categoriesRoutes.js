const router = require("express").Router();
const categoriesController = require("../controllers/categoriesControllers");

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getAllCategory);
router.put("/:id", categoriesController.upDateCategoryById);
router.delete("/:id", categoriesController.deleteCategoryById);

module.exports = router;
