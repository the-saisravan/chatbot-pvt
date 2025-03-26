const { GoogleGenAI } = require("@google/genai") ;
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/chat", async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.MY_API_KEY });
  let {userPrompt} = req.body
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
    });
    console.log(userPrompt);
    let result = response.text
    return res.send({"message": result}).json();
});

module.exports = app;
