import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, FileText, Mic, Clock } from "lucide-react";
import getSummaryDetail from "@/features/summaryDetail/api/getSummaryDetail";

type Props = {
  params: Promise< { summaryId : string; }>
}

const App = async ({params}:Props) => {
  // 認証チェック
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    redirect("/auth/signIn");
  }

  const { summaryId } = await params;

  const data = await getSummaryDetail(summaryId);

  return (
    <div className="min-h-screen bg-[#F8F5F0] p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="fixed left-0 right-0 grid items-center grid-cols-[1fr_auto_1fr] pt-4 px-4">
          <BackButton />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">📖 要約の詳細</h1>
          </div>
        </div>

        <div className="space-y-6 pt-20">
          {/* 本のタイトル */}
          <Card className="rounded-2xl shadow-lg shadow-green-100/50 border-green-50 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3 text-gray-800">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} className="text-[#16A34A]" />
                </div>
                <div className="font-bold text-xl">
                  本のタイトル
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {data.title}
                </h2>
              </div>
            </CardContent>
          </Card>

          {/* 作成日 */}
          <Card className="rounded-2xl shadow-lg shadow-green-100/50 border-green-50 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3 text-gray-800">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-[#16A34A]" />
                </div>
                <div className="font-bold text-xl">記録日</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-gray-700 font-medium">
                  {new Date(data.createdAt).toLocaleDateString('ja-JP', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 要約統計 */}
          <Card className="rounded-2xl shadow-lg shadow-green-100/50 border-green-50 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3 text-gray-800">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-[#16A34A]" />
                </div>
                <div className="font-bold text-xl">要約情報</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>


          {/* 全体の要約 */}
          <Card className="rounded-2xl shadow-lg shadow-green-100/50 border-green-50 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3 text-gray-800">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mic size={20} className="text-[#16A34A]" />
                </div>
                <div className="font-bold text-xl">音声要約</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* アクションボタン */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Button className="w-full rounded-2xl bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-6 shadow-lg shadow-green-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-base">
                <span className="mr-2 text-lg">🎤</span>
                新しい要約を記録する
              </Button>
            </Link>
            
            <Link href="/books" className="block">
              <Button variant="outline" className="w-full rounded-2xl bg-white hover:bg-green-50 text-gray-800 font-semibold py-6 border-2 border-green-100 hover:border-green-200 shadow-lg shadow-green-100/50 hover:shadow-xl transition-all duration-300 text-base">
                <span className="mr-2 text-lg">📚</span>
                要約リストに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
