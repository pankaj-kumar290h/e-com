const category = require("../models/category");
const Category = require("../models/category");

///get the category and set in to req.catagory
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        erroe: "Category not found",
      });
    }
    req.category = cate;
  });

  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category note found in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.catagory);
};
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    res.json(items);
  });
};
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove Category",
      });
    }
    res.json({
      message: "Successfull deleted",
    });
  });
};
