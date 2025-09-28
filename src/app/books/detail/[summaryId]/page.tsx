import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


// SVGアイコンのプロパティを定義する新しいインターフェース
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Lucide-ReactアイコンをインラインSVGとして定義
const Calendar: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);


const BookOpen: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);


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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/summaryBookDetail`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ summaryId }),
      cache: "no-store",
    }
  );

  const data = await res.json();


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 pb-20 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-md mx-auto pt-8">
        {/* ヘッダー */}
        <div className="flex items-center mb-6">
          <BackButton />
          <div className="flex-1">
            <h1 className="text-xl text-gray-800">要約の詳細</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* 本のタイトル */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <BookOpen size={20} className="text-teal-500" />
                <span>タイトル</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl text-gray-800">{data.title}</h2>
            </CardContent>
          </Card>

          {/* 読書日 */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <Calendar size={20} className="text-cyan-500" />
                <span>作成日</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {new Date(data.createdAt).toLocaleDateString('ja-JP', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>


          {/* 全体の要約 */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">全体の要約</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 overflow-y-scroll h-80">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {data.summary}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>📝 音声生成された要約</span>
                <span>{data.summary.split(' ').length} words</span>
              </div>
            </CardContent>
          </Card>

          {/* アクションボタン */}
          <div className="space-y-3">
            <Button
              className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg"
            >
              新しい要約を記録
            </Button>
            <Link href="/books/1" passHref>
              <Button
                className="w-full rounded-xl border-gray-200 hover:bg-gray-50 bg-white text-gray-800"
              >
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
