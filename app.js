const { GoogleGenAI } = require("@google/genai");
const { marked } = require("marked");
require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const ai = new GoogleGenAI({ apiKey: process.env.MY_API_KEY });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/chat", async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.MY_API_KEY });
  let { userPrompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
    });
    let result = marked(response.text);
    return res.send({ message: result }).json();
  } catch (error) {
    console.log("Error:", error);
  }
});

app.post("/chat/proposal", async (req, res) => {
  let { userPrompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are now a Proposal Generator for businesses",
      },
    });
    let result = marked(response.text);
    return res.send({ message: result }).json();
  } catch (error) {
    console.log("Error:", error);
  }
});

module.exports = app;
