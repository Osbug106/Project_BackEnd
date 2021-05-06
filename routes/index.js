const router = require("express").Router();
const categories = require("./categories");
const products = require("./products");
const vendors= require("./vendors");
const posts = require("./posts")
router.use("/categories", categories);
router.use("/products", products);
router.use("/vendors", vendors);
router.use("/posts", posts);
module.exports = router;