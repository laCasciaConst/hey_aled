const express = require("express");
const router = express.Router();
const { callChatGPT } = require("./chatgpt.js");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await callChatGPT(prompt);
  
    if (response) {
      res.json({ response: response });
    } else {
      res.status(500).json({ error: "Failed to get response from ChatGPT API" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
