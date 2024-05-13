"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateJoke({ title }: { title: string }) {
  try {
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
      return "Please sign in to generate a joke";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Use the title '${title}' for writing a joke. Write maximum 3 lines in plain text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);

    return text;
  } catch (error) {
    console.error(error);
    return "Failed to generate a joke";
  }
}
