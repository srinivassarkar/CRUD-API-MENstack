const mongoose = require("mongoose");
const Product = require("../models/Products");
const Category = require("../models/Category");

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    if (!name) {
      return res.status(422).json({ error: "Name field is required!" });
    }
    if (!price) {
      return res.status(422).json({ error: "Price field is required!" });
    }
    if (!category) {
      return res.status(422).json({ error: "Category field is required!" });
      // } else if (
      //   !Product.schema.path("category").enumValues.includes(req.body.category)
      // ) {
      //   return res.status(422).json({
      //     error: `Category must be one of these options ${Product.schema
      //       .path("category")
      //       .enumValues.join(", ")}`,
      //   });
      // }
    } else if (!(await Category.findById(req.body.category))) {
      return res.status(422).json({
        error: `Category not found`,
      });
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select("-__v")
      .populate({ path: "category", select: "_id name" });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid ID" });
    }
    const product = await Product.findById(req.params.id)
      .select("-__v")
      .populate({ path: "category", select: "_id name" });
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    if (!(await Category.findById(req.params.categoryId))) {
      return res.status(404).json({ error: "Category not found" });
    }
    const products = await Product.find({ category: req.params.categoryId })
      .select("-__v")
      .populate({ path: "category", select: "_id name" });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.upDateProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid ID" });
    }

    if (!(await Product.exists({ _id: req.params.id }))) {
      return res.status(404).json({ error: "product not found" });
    }

    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(productUpdated);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    } else {
      await product.deleteOne();
    }

    return res.status(204).json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
