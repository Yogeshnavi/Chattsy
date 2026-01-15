const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getMessages } = require("../controllers/message.controller");

router.get("/:userId", auth, getMessages);

module.exports = router;
