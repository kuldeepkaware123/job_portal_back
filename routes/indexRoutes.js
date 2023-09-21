const express = require("express");
const {
  homepage,
  currentUser,
  usersignup,
  usersignin,
  usersignout,
  allusers,
  updateUser,
  deleteUser
} = require("../controllers/indexControllers");
const { isauthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /
router.post("/user", isauthenticated, currentUser);

// POST /user/signup
router.post("/user/signup", usersignup);

// POST /user/signin
router.post("/user/signin", usersignin);

// POST /user/signout
router.post("/user/signout", isauthenticated, usersignout);

// POST /read
router.post("/read", allusers);

// POST /user/update:userId
router.post("/user/update/:id", isauthenticated, updateUser);

// POST /user/delete:userId
router.post("/user/delete/:id", isauthenticated, deleteUser);

module.exports = router;
