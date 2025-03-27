const { GoogleGenAI } = require("@google/genai") ;
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


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post("/chat", async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.MY_API_KEY });
  let {userPrompt} = req.body
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config:{
        systemInstruction: "Provide Content in HTML format without head, html and body tags. Just Format text using relevant HTML elements give some line breaks for clear information",
      },
    });
    console.log(userPrompt);
    let result = response.text
    console.log(result);
    return res.send({"message": result}).json();
});

module.exports = app;
