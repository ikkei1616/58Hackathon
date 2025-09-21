// import BackButton from "@/app/components/BackButton";
// import Link from "next/link";
// import React from "react";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";


// // SVGアイコンのプロパティを定義する新しいインターフェース
// interface IconProps extends React.SVGProps<SVGSVGElement> {
//   size?: number;
// }

// // Lucide-ReactアイコンをインラインSVGとして定義
// const ArrowLeft: React.FC<IconProps> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M19 12H5" />
//     <path d="M12 19l-7-7 7-7" />
//   </svg>
// );

// const Calendar: React.FC<IconProps> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M8 2v4" />
//     <path d="M16 2v4" />
//     <rect width="18" height="18" x="3" y="4" rx="2" />
//     <path d="M3 10h18" />
//   </svg>
// );

// const Target: React.FC<IconProps> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <circle cx="12" cy="12" r="10" />
//     <circle cx="12" cy="12" r="6" />
//     <circle cx="12" cy="12" r="2" />
//   </svg>
// );

// const BookOpen: React.FC<IconProps> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//     <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//   </svg>
// );

// // Shadcn/uiのモックUIコンポーネントのProps型定義
// interface ButtonProps extends React.ComponentProps<'button'> {
//   children: React.ReactNode;
//   className: string;
// }

// interface CardProps extends React.ComponentProps<'div'> {
//   children: React.ReactNode;
//   className?: string;
// }

// interface CardHeaderProps extends React.ComponentProps<'div'> {
//   children: React.ReactNode;
//   className?: string;
// }

// interface CardTitleProps extends React.ComponentProps<'h3'> {
//   children: React.ReactNode;
//   className?: string;
// }

// interface CardContentProps extends React.ComponentProps<'div'> {
//   children: React.ReactNode;
//   className?: string;
// }

// interface InputProps extends React.ComponentProps<'input'> {
//   className?: string;
// }

// interface LabelProps extends React.ComponentProps<'label'> {
//   children: React.ReactNode;
//   className?: string;
// }

// // Shadcn/uiのモックUIコンポーネント
// const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
//   <button className={`p-2 rounded-xl text-sm font-medium transition-colors ${className}`} {...props}>
//     {children}
//   </button>
// );

// const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
//   <div className={`rounded-xl border shadow-sm ${className}`} {...props}>
//     {children}
//   </div>
// );

// const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
//     {children}
//   </div>
// );

// const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => (
//   <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
//     {children}
//   </h3>
// );

// const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
//   <div className={`p-6 pt-0 ${className}`} {...props}>
//     {children}
//   </div>
// );

// const Input: React.FC<InputProps> = ({ className, ...props }) => (
//   <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
// );

// const Label: React.FC<LabelProps> = ({ children, className, ...props }) => (
//   <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
//     {children}
//   </label>
// );


// type Props = {
//   params: Promise< { summaryId : string; }>
// }

// const App = async ({params}:Props) => {
//   // 認証チェック
//   const session = await auth();
//   const user = session?.user;

//   if (!session || !user) {
//     redirect("/auth/signIn");
//   }

//   const { summaryId } = await params;

//   const res = await fetch(
//     `https://58-hackathon.vercel.app/api/summaryBookDetail`,
//     {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ summaryId }),
//       cache: "no-store",
//     }
//   );

//   const data = await res.json();


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 pb-20 font-sans">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
//         body {
//           font-family: 'Inter', sans-serif;
//         }
//       `}</style>
//       <script src="https://cdn.tailwindcss.com"></script>
//       <div className="max-w-md mx-auto pt-8">
//         {/* ヘッダー */}
//         <div className="flex items-center mb-6">
//           <BackButton />
//           <div className="flex-1">
//             <h1 className="text-xl text-gray-800">要約の詳細</h1>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {/* 本のタイトル */}
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
//                 <BookOpen size={20} className="text-teal-500" />
//                 <span>タイトル</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <h2 className="text-xl text-gray-800">{data.title}</h2>
//             </CardContent>
//           </Card>

//           {/* 読書日 */}
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
//                 <Calendar size={20} className="text-cyan-500" />
//                 <span>作成日</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-700">
//                 {new Date(data.createdAt).toLocaleDateString('ja-JP', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </p>
//             </CardContent>
//           </Card>


//           {/* 全体の要約 */}
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg text-gray-800">全体の要約</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 overflow-y-scroll h-80">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                   {data.summary}
//                 </p>
//               </div>
//               <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
//                 <span>📝 音声生成された要約</span>
//                 <span>{data.summary.split(' ').length} words</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* アクションボタン */}
//           <div className="space-y-3">
//             <Button
//               className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg"
//             >
//               新しい要約を記録
//             </Button>
//             <Link href="/books/1" passHref>
//               <Button
//                 className="w-full rounded-xl border-gray-200 hover:bg-gray-50 bg-white text-gray-800"
//               >
//                 要約リストに戻る
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import BackButton from "@/app/components/BackButton";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BookOpen, Calendar } from "lucide-react";

// APIレスポンスの型定義
interface SummaryBookDetail {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  params: Promise<{ summaryId: string; }>
}

const App = async ({ params }: Props) => {
  // 認証チェック
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    redirect("/auth/signIn");
  }

  const { summaryId } = await params;

  const res = await fetch(
    `https://58-hackathon.vercel.app/api/summaryBookDetail`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summaryId }),
      cache: "no-store",
    }
  );

  const data: SummaryBookDetail = await res.json();

  return (
    <div className="min-h-screen bg-[#F8F5F0] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center mb-8">
          <BackButton />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">📖 要約詳細</h1>
            <div className="w-16 h-1 bg-[#16A34A] mx-auto rounded-full mt-2"></div>
          </div>
        </div>

        {/* 本のタイトルカード */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#16A34A]/10 rounded-2xl flex items-center justify-center">
              <BookOpen size={20} className="text-[#16A34A]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">本のタイトル</h2>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
            {data.title}
          </h3>
        </div>

        {/* 作成日カード */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">作成日</h2>
          </div>
          <p className="text-gray-700 font-medium">
            {new Date(data.createdAt).toLocaleDateString('ja-JP', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* 要約内容カード */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-purple-600 text-lg">📝</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">音声要約</h2>
          </div>
          
          <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100 mb-4">
            <div className="max-h-80 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {data.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>音声で生成された要約</span>
            </div>
            <span>{data.summary.length} 文字</span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3 pt-4">
          <Link href="/" className="block">
            <button className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-200/70 hover:scale-105">
              ✨ 新しい要約を記録
            </button>
          </Link>
          
          <Link href="/books" className="block">
            <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-gray-100/50 border border-gray-200 hover:border-gray-300">
              📚 要約一覧に戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
