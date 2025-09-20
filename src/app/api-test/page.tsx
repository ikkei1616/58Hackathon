"use client"
import GetGeminiSummary from "@/app/components/GeminiSummarys";
export default function Page(){
    function handleOnclick (){
        GetGeminiSummary("こんにちは、今日の天気を教えてください");
    }
    return (
        <div>
            <div>
                <button onClick={handleOnclick}>
                    円ボタン
                </button>
            </div>
        </div>
    )
}