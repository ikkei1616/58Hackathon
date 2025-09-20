"use client"
//「IDが6の読書記録データを表示する詳細ページ」のReactコンポーネントです
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";

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

// モックデータの型定義
interface SummaryItem {
  id: number;
  title: string;
  user_id: number;
  summary: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// モックデータ (サーバーサイドで取得をシミュレート)
const mockData: SummaryItem[] = [
  { id: 1, title: "React入門", user_id: 101, summary: "本日は React の基本的な考え方を学んだ。特にコンポーネントの分割方法と再利用性について理解を深めることができた。フック（useState, useEffect）を用いて状態管理を行う練習もした。これらを活用することで、単純なカウンターアプリや ToDo リストを効率的に構築できると実感した。", created_at: "2025-09-01T10:00:00Z", updated_at: "2025-09-01T10:30:00Z", deleted_at: null },
  { id: 2, title: "Next.jsアプリ構築", user_id: 102, summary: "Next.js を使って新しいアプリを構築。SSG（静的サイト生成）と SSR（サーバーサイドレンダリング）の違いを実際に動かして確認した。さらに API Routes を用いて簡単なエンドポイントを作成し、フロントエンドからデータを取得する流れを試した。パフォーマンス計測も行い、CSRとの違いを実感。", created_at: "2025-09-02T09:15:00Z", updated_at: "2025-09-02T09:20:00Z", deleted_at: null },
  { id: 3, title: "Prisma ORM学習", user_id: 101, summary: "Prisma を使って Postgres データベースと接続し、スキーマ定義からマイグレーションを行った。モデルを追加してリレーションを張る練習も実施。例えば User と Post の関係を one-to-many で表現し、実際にクエリを投げてデータを取得した。Prisma Studio を利用すると GUI でデータの確認ができ、とても便利だった。", created_at: "2025-09-03T14:00:00Z", updated_at: "2025-09-03T14:10:00Z", deleted_at: null },
  { id: 4, title: "NeonでPostgres", user_id: 103, summary: "Neon を利用してクラウド上に Postgres 環境を用意。接続文字列を取得し、ローカルの Prisma プロジェクトから接続してみた。Neon は無料枠で接続数制限があるため、接続プーリングを有効化する方法についても調べた。データベースのレスポンスは安定しており、学習用には十分だった。", created_at: "2025-09-04T18:00:00Z", updated_at: "2025-09-04T18:15:00Z", deleted_at: null },
  { id: 5, title: "Auth.jsの使い方", user_id: 104, summary: "Auth.js を使って GitHub 認証を導入した。ログイン後にはセッションが作成され、ユーザー情報がデータベースに保存されることを確認。PrismaAdapter を利用して User や Account テーブルにレコードが作られる流れを学んだ。また、JWT と DB セッションの違いについても調査し、サーバーレス環境では JWT の方が向いていると理解した。", created_at: "2025-09-05T11:30:00Z", updated_at: "2025-09-05T11:50:00Z", deleted_at: null },
  { id: 6, title: "Firebase Firestore練習", user_id: 102, summary: "Firebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore irebase Firestore を使ってデータを追加、更新、削除する処理を練習。React のフォームと組み合わせ、ユーザー入力を Firestore に保存するサンプルアプリを作った。さらにリアルタイムでデータが反映される機能を確認し、Socket を意識せずに動作する点が非常に便利だと感じた。", created_at: "2025-09-06T08:40:00Z", updated_at: "2025-09-06T08:42:00Z", deleted_at: null },
  { id: 7, title: "TypeScript型入門", user_id: 105, summary: "TypeScript の型注釈について学んだ。変数や関数の引数に型をつけると、開発中にエラーが早期に検出される点が非常に便利。インターフェースと型エイリアスの違いを理解し、オブジェクトの構造を安全に扱えるようになった。また、ジェネリクスを使った型定義により、柔軟な関数を設計できることも実感。", created_at: "2025-09-07T21:00:00Z", updated_at: "2025-09-07T21:15:00Z", deleted_at: null },
  { id: 8, title: "SQL基礎復習", user_id: 106, summary: "SQL の基礎を復習。SELECT 文でデータを取得し、WHERE 句で条件を絞り込む方法を改めて確認。INNER JOIN と LEFT JOIN を比較し、結合方法によって取得できるレコードがどう変化するかをテーブル例で試した。GROUP BY と HAVING 句を組み合わせて集計クエリを作成する練習も行った。", created_at: "2025-09-08T13:25:00Z", updated_at: "2025-09-08T13:30:00Z", deleted_at: null },
  { id: 9, title: "UI/UXデザイン勉強", user_id: 101, summary: "Figma を使って新しいアプリのプロトタイプを作成。Auto Layout 機能を使ってレスポンシブデザインを意識し、ボタンやカードコンポーネントを再利用可能な形で作成した。さらに、ユーザーフローを意識して画面遷移を設計し、実際にクリックして動作を確認できるインタラクティブなプロトタイプを作った。", created_at: "2025-09-09T15:10:00Z", updated_at: "2025-09-09T15:40:00Z", deleted_at: null },
  { id: 10, title: "Docker環境構築", user_id: 107, summary: "Docker Compose を使って Next.js + Postgres の環境を構築した。Dockerfile と docker-compose.yml を作成し、アプリケーションとデータベースがコンテナ上で連携するように設定。ホットリロードの設定に少し苦戦したが、最終的に開発効率を大幅に向上させられることがわかった。コンテナ化により環境差異をなくせる点は非常に大きなメリットだと感じた。", created_at: "2025-09-10T17:45:00Z", updated_at: "2025-09-10T17:50:00Z", deleted_at: null },
];

const App = () => {
  const {summaryId} = useParams();
  const [summaryBook, setSummaryBook] = React.useState<SummaryItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
  const response = await fetch(`/api/summarybook/${summaryId}`, {
     method: "GET",
  });

  if (!response.ok) {
    return <div>要約が見つかりません。</div>;
  }

  const data:SummaryItem = await response.json();
  setSummaryBook(data);
}
    fetchData();
   
},[])


  

  if (!summaryBook) {
    return <div>Loading...</div>;
  }
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
          <Link href="/books/1" passHref>
            <Button
              className="mr-3 rounded-full bg-white/50 hover:bg-white/80 transition-all text-gray-800"
            >
              <ArrowLeft size={20} />
            </Button>
          </Link>
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
              <h2 className="text-xl text-gray-800">{summaryBook.title}</h2>
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
                {new Date(summaryBook.created_at).toLocaleDateString('ja-JP', {
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
                  {summaryBook.summary}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>📝 音声生成された要約</span>
                <span>{summaryBook.summary.split(' ').length} words</span>
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

