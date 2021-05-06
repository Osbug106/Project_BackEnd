const vendors = require("../controllers/vendors");

const router = require("express").Router();
router.route("/").get(vendors.getAll);
router.route("/profilecompleted/:percent").get(vendors.getByProfileCompletion);
router.route("/:id").get(vendors.getById);
module.exports = router;