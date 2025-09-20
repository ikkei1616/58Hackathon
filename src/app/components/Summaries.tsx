"use client";
import { User } from "@/type";
import { useEffect, useState } from "react";
import type { ReadingLogList } from "@/type";
import SummaryListItem from "./SummaryListItem";

type Props = {
  userInfo: User;
};

const Summaries = ({ userInfo }: Props) => {
  const userId = userInfo.id;

  const [month, setMonth] = useState("2025-09");
  const [summaryBooks, setSummaryBooks] = useState<ReadingLogList[]>([]);

  useEffect(() => {
    async function getSummaries() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/summarybook?userId=${userId}`,
          { cache: "no-store" }
        );
        const summaryBooks = await res.json();
        console.log(summaryBooks);
        setSummaryBooks(summaryBooks);
        
      } catch (error) {
        console.error(error);
      }
    }
    getSummaries();
  }, []);

  function find_month(): ReadingLogList[] {
    const arr: ReadingLogList[] = [];
    summaryBooks.forEach((elm, _index) => {
      const dete = elm.createdAt.slice(0, 7);
      if (month === dete) {
        arr.push(elm);
      }
    });
    return arr;
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
        <label htmlFor="select-month-input">月を選択</label>
        <input
          id="select-month-input"
          className="select_month_input"
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="YYYY-MM"
          title="YYYY-MM形式で入力してください"
          pattern="\d{4}-\d{2}"
          inputMode="numeric"
        />
        <div className="select_month_check">{month}</div>
      </div>
      <div className="list">
        {summaryBooks ? (
          find_month().map((item, _index) => (
          <SummaryListItem
            key={item.id}
            summaryId ={item.id}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            summary={item.summary}
            title={item.title}
          />
        ))) : (
          <div className="no_summary">要約がありません</div>
        )}
      </div>
    </div>
  );
};

export default Summaries;
