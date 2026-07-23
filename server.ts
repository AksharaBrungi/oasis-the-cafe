import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client if API key is provided
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", cafe: "Oasis The Cafe" });
  });

  // AI Food Recommendation Chatbot Endpoint
  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      const { userMessage, preferences } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply:
            "Welcome to Oasis The Cafe! I can recommend our top dishes like Chicken Tikka Woodfired Pizza, White Sauce Pasta, and Oasis Signature Ruby Mocktail based on your preferences. (Tip: Set GEMINI_API_KEY in Secrets for live AI responses!)",
          recommendations: [
            "Chicken Tikka Woodfired Pizza",
            "White Sauce Pasta",
            "Oasis Signature Ruby Mocktail",
          ],
        });
      }

      const systemPrompt = `You are "Oasis Gourmet AI", the luxury sommelier and culinary concierge for "Oasis The Cafe", Hyderabad ("A Paradise On Roof" in BN Reddy Nagar).
You speak with warmth, sophistication, and enthusiasm.
Oasis Menu Highlights:
- Pizza: Chicken Tikka Woodfired Pizza (₹420, Non-Veg, Best Seller), Truffle Mushroom Pizza (₹380, Veg)
- Pasta: Creamy White Sauce Pasta (₹349, Veg), Arrabbiata Penne (₹329, Veg)
- Burgers: Double Smash Chicken Burger (₹399, Non-Veg), Crispy Paneer Burger (₹299, Veg)
- Chinese & Bowls: Chili Garlic Noodles (₹279, Veg), Dragon Chicken (₹349, Non-Veg), Schezwan Fried Rice (₹269, Veg)
- Mocktails: Oasis Signature Ruby Mocktail (₹249), Tropical Passion Mojito (₹229), Electric Blue Lagoon (₹219)
- Shakes: Oreo Thickshake (₹199), Hazelnut Nutella Shake (₹249)
- Desserts: Warm Sizzling Brownie with Vanilla Ice Cream (₹229), Red Velvet Lava Cake (₹249)

Help the guest pick the perfect dish, meal combination, or celebration menu according to their mood, veg/non-veg choice, group size, or occasion. Keep responses concise (under 120 words), elegant, appetizing, and friendly. Always invite them to click 'Add to Order' or visit the rooftop!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nGuest query: "${userMessage}"\nPreferences: ${JSON.stringify(
                  preferences || {}
                )}`,
              },
            ],
          },
        ],
      });

      const replyText =
        response.text ||
        "I'd love to suggest our Chicken Tikka Pizza and Oasis Signature Ruby Mocktail for a fantastic rooftop dining experience!";

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: "Failed to fetch AI recommendation",
        reply:
          "I recommend trying our Chef's Special Chicken Tikka Woodfired Pizza and Oasis Signature Ruby Mocktail under the stars!",
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oasis The Cafe server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server start failed:", err);
});
