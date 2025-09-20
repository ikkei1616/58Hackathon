import BackButton from "@/app/components/BackButton";
import Link from "next/link";
import React from "react";


// SVGアイコンのプロパティを定義する新しいインターフェース
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Lucide-ReactアイコンをインラインSVGとして定義
const ArrowLeft: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const Calendar: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const Target: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BookOpen: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Shadcn/uiのモックUIコンポーネントのProps型定義
interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className: string;
}

interface CardProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps extends React.ComponentProps<'h3'> {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
}

interface LabelProps extends React.ComponentProps<'label'> {
  children: React.ReactNode;
  className?: string;
}

// Shadcn/uiのモックUIコンポーネント
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`p-2 rounded-xl text-sm font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={`rounded-xl border shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const Label: React.FC<LabelProps> = ({ children, className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);


type Props = {
  params: Promise< { summaryId : string; }>
}

const App = async ({params}:Props) => {
  const { summaryId } = await params;

  const res = await fetch(
    'http://localhost:3000/api/summaryBookDetail',
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
