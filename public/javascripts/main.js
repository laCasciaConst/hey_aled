require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const router = express.Router();
const app = express();
const fetch = require("node-fetch");
const url = "https://api.openai.com/v1/completions";

app.use(express.json()); // json 본문 파싱용 미들웨어
app.use("/api", router);

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
    addToDiscussion("other", data.response);
    console.log(data);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/chat", async (req, res) => {
  const userInput = req.body.userInput; // 클라이언트로부터 입력 받음

  try {
    // OpenAI API 호출 등의 로직 수행
    const response = await fetchData(userInput);
    const responseData = await response.json();

    // 클라이언트에 결과 데이터 전송
    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/chat", async (req, res) => {
  const userInput = req.body.prompt;

  try {
    const chatResponse = await fetchData(userInput);

    if (response) {
      res.json({ response: chatResponse });
    } else {
      res
        .status(500)
        .json({ error: "Failed to get response from ChatGPT API" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
