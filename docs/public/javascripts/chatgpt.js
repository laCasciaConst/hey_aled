require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

async function callChatGPT(prompt) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "roleplay", content: "tu es une amie qui est perdu dans la rue et me demander à t'aider" }],
    });

    console.log(completion.choices[0]);

    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    return null;
  }
}

module.exports = { callChatGPT };
