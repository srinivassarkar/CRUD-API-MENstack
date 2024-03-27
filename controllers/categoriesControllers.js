const mongoose = require("mongoose");
const Category = require("../models/Category");
const Products = require("../models/Products");

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "Name field is required!" });
    }
    if (await Category.findOne({ name: req.body.name })) {
      return res
        .status(409)
        .json({ error: `The Category ${req.body.name} already exists` });
    }

    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().select("__v");
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.upDateCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid ID" });
    }

    if (!(await Category.exists({ _id: req.params.id }))) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryUpdated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(categoryUpdated);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid ID" });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    } else {
      const productsCount = await Products.countDocuments({
        category: category_id,
      });
      if (!productsCount > 0) {
        return res.status(409).json({
          error: `Category ${category} is being used in ${productsCount} product(s)`,
        });
      }
      await category.deleteOne();
    }

    return res.status(204).json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
