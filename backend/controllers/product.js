const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // restrice on field

    const { name, description, catagory, stock, price } = fields;

    if (!name || !description || !catagory || !stock || !price) {
      return res.statue(400).json({
        erroe: "plz include all field",
      });
    }

    let product = new Product(fields);

    ///handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.statue(400).json({
          error: "file size biger then 3mb",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    ///save to the db;
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "faild to save product",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
//middleware

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
//delet controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.statue(400).json({
        erroe: "faild to delet the product",
      });
    }
    res.json({
      massage: "Sucessfully delet product",
    });
  });
};
//update product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // restrice on field

    // updation code
    let product = req.product;
    product = _.extend(product, fields);

    ///handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.statue(400).json({
          error: "file size biger then 3mb",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    ///save to the db;
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "faild to update product",
        });
      }
      res.json(product);
    });
  });
};

//product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.statue(400).json({
          message: "no product found",
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.product.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, products) => {
    if (err) {
      return res.statue(400).json({
        error: "bulk operation failed",
      });
    }
    next();
  });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.statue(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};
