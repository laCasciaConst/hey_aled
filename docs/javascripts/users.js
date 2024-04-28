const express = require("express");
const dotenv = require('dotenv');

dotenv.config(); // dotenv를 사용하여 환경 변수 설정

const router = express.Router();

// '/users' 경로에 대한 GET 요청 처리
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = dotenv;
