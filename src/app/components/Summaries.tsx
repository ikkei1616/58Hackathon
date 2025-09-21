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
  }, [userId]);

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
    <div className=" bg-[#F8F5F0] px-4 py-6 mb-18">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
          📚 本の要約一覧
        </h1>
        <div className="w-16 h-1 bg-[#16A34A] mx-auto rounded-full"></div>
      </div>

      {/* 月選択セクション */}
      <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 mb-6 border border-green-50">
        <p className="text-gray-700 font-medium mb-4 text-center">
          📅 最後に読んだ月を選択してください
        </p>
        
        <div className="space-y-3">
          <label 
            htmlFor="select-month-input" 
            className="block text-sm font-medium text-gray-600"
          >
            月を選択
          </label>
          
          <input
            id="select-month-input"
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="YYYY-MM"
            title="YYYY-MM形式で入力してください"
            pattern="\d{4}-\d{2}"
            inputMode="numeric"
            className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all duration-200 bg-green-50/30"
          />
          
          <div className="bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-2xl p-3">
            <span className="text-[#16A34A] font-medium">選択中: {month}</span>
          </div>
        </div>
      </div>

      {/* リストセクション */}
      <div className="space-y-4">
        {summaryBooks && find_month().length > 0 ? (
          find_month().map((item, _index) => (
            <div key={item.id} className="transform transition-all duration-200 hover:scale-105">
              <SummaryListItem
                summaryId={item.id}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                summary={item.summary}
                title={item.title}
              />
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-8 text-center border border-green-50">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              要約がありません
            </h3>
            <p className="text-gray-500 text-sm">
              選択した月の読書記録が見つかりませんでした
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summaries;
