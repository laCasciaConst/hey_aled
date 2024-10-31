// 필요한 모듈 불러오기
// modules
const createError = require("http-errors");
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const app = express();
const router = express.Router();

// 뷰 엔진 및 미들웨어 설정
// view engines and middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
// router
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/api", router);

// 404 오류 처리 및 오류 핸들러
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  // 오류 정보 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // 오류 페이지 렌더링
  res.status(err.status || 500).render("error");
  console.log("#####################################");
  console.log(res.status);
  console.log(err.stack);
  console.log("#####################################");
});

async function fetchData() {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        prompt: userInput,
        max_tokens: 150,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(data);
    throw error;
  }
}

// api 호출
router.post("/chat", async (req, res) => {
  try {
    const userInput = req.body.prompt;
    const data = await fetchData(userInput);
    if (data) {
      res.json(data); // 클라이언트에 응답 데이터 반환
    } else {
      res.status(404).json({ error: "No data returned from the API"});
    }
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    res.status(500).json({ error: "Failed to communicate with OpenAI API" });
  }
});

//서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `####################################################################################
                            RUNNING NODE.JS on port ${port}
####################################################################################`
  );
});

module.exports = app;
