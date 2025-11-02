import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import { Calendar, BookOpen, FileText, Mic, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfoCard from "@/components/InfoCard";
import Header from "@/components/Header";
import getSummaryDetail from "@/features/summaryDetail/api/getSummaryDetail";
import { SummaryBookDetail } from "./types";

type Props = {
  summaryId: string;
};

const SummaryDetail = async ( {summaryId}: Props) => {
  // 認証チェック
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    redirect("/auth/signIn");
  }

  const data: SummaryBookDetail = await getSummaryDetail(summaryId);

  return (
    <div className="min-h-screen bg-[#F8F5F0] p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <Header title="📖 要約の詳細"></Header>

        <div className="space-y-6 pt-20">
          {/* 本のタイトル */}
          <InfoCard
            icon={<BookOpen size={20} className="text-[#16A34A]" />}
            title="本のタイトル"
          >
            <div className="bg-green-50 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
                {data.title}
              </h2>
            </div>
          </InfoCard>

          {/* 作成日 */}
          <InfoCard
            icon={<Calendar size={20} className="text-[#16A34A]" />}
            title="記録日"
          >
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-gray-700 font-medium">
                {new Date(data.createdAt).toLocaleDateString("ja-JP", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </InfoCard>

          {/* 要約統計 */}
          <InfoCard
            icon={<FileText size={20} className="text-[#16A34A]" />}
            title="要約情報"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-[#16A34A]">
                  {data.summary.length}
                </div>
                <div className="text-sm text-gray-600">文字数</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-[#16A34A]">
                  {Math.ceil(data.summary.length / 100)}
                </div>
                <div className="text-sm text-gray-600">分で読める</div>
              </div>
            </div>
          </InfoCard>

          {/* 全体の要約 */}
          <InfoCard
            icon={<Mic size={20} className="text-[#16A34A]" />}
            title="音声要約"
          >
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
              <div className="max-h-80 overflow-y-auto">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                  {data.summary}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={14} />
                  <span>音声で生成</span>
                </div>
                <div className="text-[#16A34A] font-medium">
                  {data.summary.length} 文字
                </div>
              </div>
            </div>
          </InfoCard>

          {/* アクションボタン */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Button className="w-full rounded-2xl bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-6 shadow-lg shadow-green-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-base">
                <span className="mr-2 text-lg">🎤</span>
                新しい要約を記録する
              </Button>
            </Link>

            <Link href="/books" className="block">
              <Button
                variant="outline"
                className="w-full rounded-2xl bg-white hover:bg-green-50 text-gray-800 font-semibold py-6 border-2 border-green-100 hover:border-green-200 shadow-lg shadow-green-100/50 hover:shadow-xl transition-all duration-300 text-base"
              >
                <span className="mr-2 text-lg">📚</span>
                要約リストに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryDetail