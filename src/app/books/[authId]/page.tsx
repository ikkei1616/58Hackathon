"use client"
// import React, { useEffect } from "react"
import "./style.css"

import {useState} from "react"
import { ReadingList } from "@/app/components/ReadingList";
import { ReadingLogList, ReadingLogListPage } from "@/type";
import { useRouter } from 'next/router';

type Props = {
  params: Promise<{ authId: string }>
}

// **要約一覧画面(/books/[authId])**
// - 月選択ボタン
// - 本の画像付きで一覧表示

//本来のPage
interface UserPageProps {
  params: {
    authId: number; // ダイナミックセグメントの名前と型
  };
  log_list: ReadingLogList;
}

export default function Page({params,log_list}:UserPageProps){
  const {authId} = params
  console.log(authId)
  const logList : ReadingLogList[] = [] ;
    //use state
    const [month ,setMonth] = useState("2025-09")
    
    function find_month() : ReadingLogList[]{
        const arr : ReadingLogList[] = [] ;
        logList.forEach((elm,index)=>{
            const dete = elm.created_at.slice(0,7);
            if(month === dete){
                arr.push(elm)
            }
        })
        return arr ;
    }

    return (
        <div className="reading_list_page">
            <div className="header_1">
                <h1>本の要約 一覧</h1>
            </div>
            <div className="select_month">
                <p className="select_month_header">
                    最後に読んだ月を選択してください。
                </p>
                <input
                    className="select_month_input"
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                ></input>
                <div  className="select_month_check">
                    {month}
                </div>
            </div>
            <div className="list">
                {find_month().map((item, index) => (
                    <ReadingList
                        key={item.id}
                        created_at={item.created_at}
                        updated_at={item.updated_at}
                        summary={item.summary}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
    )
}

