import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "Error: NEXT_PUBLIC_GEMINI_API_KEY is not defined in .env.local."
  );
}

let chatSession = null;

try {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro", // Update to your required model version
  });

  if (!model) {
    console.error("Error: Failed to initialize the generative model.");
  } else {
    chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    });
    console.log("Chat session initialized successfully.");
  }
} catch (error) {
  console.error("Error initializing Google Generative AI session:", error);
}

export default chatSession;
