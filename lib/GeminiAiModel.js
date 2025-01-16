import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Adjust to your desired model
});

if (!model) {
  console.error("Failed to initialize the generative model. Please verify the model name and API key.");
}

const chatSession = model?.startChat({
  generationConfig: {
    temperature: 1,
    maxOutputTokens: 100,
  },
});

if (!chatSession) {
  console.error("Chat session could not be started. Please ensure the model is configured correctly.");
} else {
  console.log("Chat session successfully initialized.");
}

export default chatSession;
