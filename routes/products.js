const products = require("../controllers/products");

const router = require("express").Router();
router.get("/:id", products.getByProductId);

router.get("/ByCategory/:category", products.getByCategory);
router.get("/:category/:page", products.getByCategoryInPages);
router.get("/:category/:page/:size", products.getByCategoryInPages);

router.get("vendor/:vendor/:page", products.getByVendorInPages);
router.get("vendor/:vendor/:page/:size", products.getByVendorInPages);
module.exports = router;