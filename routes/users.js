const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// '/users' 경로에 대한 GET 요청 처리
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
// dotenv를 import하고 환경 변수를 설정합니다.

// 다른 파일에서 사용할 수 있도록 dotenv를 export합니다.
module.exports = router;