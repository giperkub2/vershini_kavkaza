import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    // Use process.env.API_KEY as required
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    const model = ai.models;

    // Format history for the API
    // Note: The new SDK suggests using 'chats' for conversational history, 
    // but for single-turn stateless or simple message passing, we can construct contents manually or use a chat session.
    // Here we will use a chat session for better context retention.
    
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        }))
    });

    const response = await chat.sendMessage({ message });
    
    return response.text || "Извините, я сейчас любуюсь горами и не могу ответить. Попробуйте позже.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка связи с базой данных. Пожалуйста, проверьте соединение.";
  }
};