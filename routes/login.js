const router = require("express").Router();

const controllers = require("../controllers/login");
const authCheck = require("../middlewares/authentication");

router.get("/login", authCheck.isLoggedOut, controllers.get_login);

router.post("/login", authCheck.isLoggedOut, controllers.post_login);

router.get("/signIn", authCheck.isLoggedIn, controllers.get_signIn);

router.post("/signIn", authCheck.isLoggedIn, controllers.post_signIn);

module.exports = router;
