import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase limit to accommodate larger translation objects
app.use(express.json({ limit: "5mb" }));

// Initialize Google GenAI securely (server-side only)
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Translation endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { targetLanguage, texts } = req.body;

    if (!targetLanguage) {
      return res.status(400).json({ success: false, error: "targetLanguage is required." });
    }

    if (!texts || typeof texts !== "object") {
      return res.status(400).json({ success: false, error: "texts is required and must be an object." });
    }

    // Instruct Gemini as a professional Legal Notary Translator
    const systemInstruction = `You are a certified professional notary, lawyer, and high-fidelity legal translator.
Your job is to translate a JSON dictionary of loan contract texts into the requested language: "${targetLanguage}".

CRITICAL INSTRUCTIONS:
1. Output a VALID JSON object with the exact same keys as the input. Do NOT add or remove keys.
2. Translate the values with absolute accuracy, using formal, official, and professional legal/notarial jargon in "${targetLanguage}".
3. Keep the layout, punctuation, and uppercase formatting styling consistent with the original.
4. Protect variables, tags, and markers if they exist (e.g. do NOT translate HTML bold tags like "<strong>" or "</strong>" or placeholders).
5. If text mentions specific state institutions (such as European Banking Authority or Bar Association), find their official equivalent name in "${targetLanguage}" or translate them neutrally and with prestige.
6. Return only the pure JSON translation object. Do not include markdown codeblocks like \`\`\`json.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Translate this text object into "${targetLanguage}":\n\n${JSON.stringify(texts)}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response returned from the Gemini translation model.");
    }

    const parsedTranslation = JSON.parse(textOutput.trim());
    res.json({ success: true, translation: parsedTranslation });
  } catch (error: any) {
    console.error("Gemini Translation Endpoint Error:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

// Configure Vite or Static asset rendering
async function main() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode with static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack App] running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Server initialization failure:", err);
});
