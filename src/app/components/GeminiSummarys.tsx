"use client"
export default async function GetGeminiSummary(summary_text:string): Promise<void> {
  // リクエストボディの型を定義します
  interface RequestBody {
    prompt: string;
  }

  const requestBody: RequestBody = {
    prompt: summary_text
  }

  try {
    const res: Response = await fetch("/api/gemini-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // res.bodyはReadableStreamなので、内容を読むための処理が必要です
    const reader = res.body?.getReader();
    if (reader) {
      const { done, value } = await reader.read();
      // valueはUint8Arrayなので、テキストにデコードします
      const decodedValue = new TextDecoder().decode(value);
      console.log(decodedValue);
    }

  } catch (error) {
    console.error("Fetchエラー:", error);
  }
}