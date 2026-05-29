const express = require("express");
const cors = require("cors"); // Allows backend and frontend to communicate even if they are on different ports (no stranger danger)
const OpenAI = require("openai");
require("dotenv").config(); // Loads environment variables from .ENV file

const PORT = 8080;
const app = express();

app.use(cors())
app.use(express.json()) // Allows to automatically read json (e.g., access like "req.body.name")

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/generate-image", async (req, res) => {
    
    try {

        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "No prompt inputed."
            });
        }

        console.log("STEP 1: route hit");
        console.log("Prompt:", prompt);

        const response = await openAI.images.generate({
            model: "gpt-image-1",
            prompt: prompt,
            size: "1024x1024",
        });

        console.log("STEP 2: OpenAI responded");
        console.log(response);

        const imageUrl = response.data[0].b64_json;

        return res.status(200).json({
            success: true,
            image: imageUrl
        });

    } catch (err) {
        console.log("Server Error:", err);

        return res.status(500).json({
            success: false,
            message: "Image generation failed"
        });
    }
});

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});