const express = require("express");
const router = express.Router();

// '/' 경로에 대한 GET 요청 처리
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
