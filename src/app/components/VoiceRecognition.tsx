"use client";

import { User } from "@/type";
import { useRef, useState } from "react";

type Props = {
  userInfo:User
};

const VoiceRecognition = ({userInfo}:Props) => {
  const [title, setTitle ] = useState<string>("");
  const [summary, setSummary ] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTitle(input)
  }

  const changeSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setSummary(input)
  }

  const postSummary = async () => {
    try {
      const res = await fetch("/api/summarybook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: userInfo.id,
          summary: summary,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to post summary");
      }
      const data = await res.json();
      console.log(data);
    } catch (e){
      console.error(e);
    }
  }

  const handleOnRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      console.log("start recording...");
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.onresult = function (event) {
        // 認識されたテキストを取得
        const transcript = event.results[0][0].transcript;

        // 認識されたテキストを保存
        setSummary(transcript);
        setIsRecording(false);
      };
      recognitionRef.current.start();
      setIsRecording(true);
      
    }
  }

  return (
    <>
      <div  className="flex flex-col gap-4 mb-3">
        <div> 
          <p>title</p>    
          <input type="text" value={title} onChange={changeTitle} title="test" className="border-2"/>
        </div>
      </div>

      <div>喋りかけてね</div>

      <button onClick={handleOnRecord} title="button">{isRecording ? "停止" : "録音"}</button>
      {summary && (
          <>
            <div>要約</div>
            <p>{summary}</p>
            <button onClick={postSummary} title="post summary" className="border-2 bg-amber-400">要約を保存する</button>
          </>
        )
      }
    </>
  )
}

export default VoiceRecognition