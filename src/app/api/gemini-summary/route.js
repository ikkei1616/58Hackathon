import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// APIキーを環境変数から取得します。
// .env.localファイルに GEMINI_API_KEY="YOUR_API_KEY" のように設定してください。
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // リクエストボディからプロンプトを取得します。
    let { prompt } = await req.json();

    // プロンプトがなければ400エラーを返します。
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    prompt += "\nマークダウン形式を使わずに要約してください。"
    // 使用するモデルを取得します。
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // プロンプトを元にコンテンツを生成します。
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 生成されたテキストをクライアントに返します。
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
