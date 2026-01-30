
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are a friendly and professional AI Veterinary Assistant named PawsGuard. 
Your goal is to help pet owners understand their pets' symptoms and provide advisory support.
Always follow these rules:
1. Start by being empathetic.
2. Ask 1-2 relevant follow-up questions to understand the situation better (e.g., "Is your dog still drinking water?", "Has there been a change in their environment?").
3. Provide possible non-emergency explanations but explicitly state you are an AI and not a substitute for professional veterinary advice.
4. If symptoms sound severe (e.g., difficulty breathing, uncontrolled bleeding, seizures, lethargy combined with persistent vomiting), STRONGLY recommend an immediate emergency vet visit.
5. Keep your tone supportive, health-focused, and concise.
6. Use bullet points for suggestions or things to monitor.
`;

export const getVetAdvice = async (history: ChatMessage[], userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ 
          role: m.role, 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now. Please try again or consult a local vet if your pet is in distress.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base. If this is an emergency, please contact your veterinarian immediately.";
  }
};
