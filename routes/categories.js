const categories = require("../controllers/categories");

const router = require("express").Router();
router.get("/",categories.getAll);
module.exports = router;