const posts = require("../controllers/posts");

const router = require("express").Router();
router.route("/:vendor/:page/").get(posts.getByVendorInPages);
router.route("/:vendor/:page/:size").get(posts.getByVendorInPages);
module.exports = router;