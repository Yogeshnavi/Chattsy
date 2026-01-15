const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getMe,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

router.get("/me", auth, getMe);
router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserById);

module.exports = router;
