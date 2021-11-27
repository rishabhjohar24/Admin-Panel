const router = require("express").Router();

const check = require("../middlewares/isAdmin");
const show = require("../controllers/show");

router.get("/verify", check.isAdmin, show.get_verifyList);

router.post("/verification", show.allow_teachers);

router.get("/info", show.get_info);

module.exports = router;
