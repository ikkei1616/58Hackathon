"use client";

import { User } from "@/type";
import { useState } from "react";

type Props = {
  userInfo:User
};

const VoiceRecognition = ({userInfo}:Props) => {
  const [title, setTitle ] = useState<string>("");
  const [summary, setSummary ] = useState<string>("");

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


  
  return (
    <>
      <div  className="flex flex-col gap-4 mb-3">
        <div> 
          <p>title</p>    
          <input type="text" value={title} onChange={changeTitle} title="test" className="border-2"/>
        </div>
        <div>
          <p>summary</p>
          <textarea  value={summary} onChange={changeSummary} title="test" className="border-2"/>
        </div>
      </div>
      <button onClick={postSummary} title="post summary" className="border-2 bg-amber-400">post summary</button>
    </>
  )
}

export default VoiceRecognition