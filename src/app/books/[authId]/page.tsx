"use client"
import React, { useEffect } from "react"
import "./style.css"

import {useState} from "react"

//モックデータ
const mockData = [
  // --- 7月のデータ ---
  {
    id: 11,
    title: "Vercelへのデプロイ",
    user_id: 108,
    summary:
      "Vercel を使って Next.js アプリを初めてデプロイした。GitHub リポジトリと連携するだけで自動的にビルドとデプロイが実行され、非常にスムーズだった。環境変数の設定方法やカスタムドメインの割り当て方も確認し、本番環境の構築手順を理解した。",
    created_at: "2025-07-25T11:00:00Z",
    updated_at: "2025-07-25T11:05:00Z",
    deleted_at: null,
  },
  {
    id: 12,
    title: "Jestで単体テスト",
    user_id: 105,
    summary:
      "Jest と React Testing Library を使って、React コンポーネントの単体テストを作成。単純なレンダリングテストから、ボタンクリックなどのユーザーインタラクションをシミュレートするテストまでを実装した。モック関数の使い方にも慣れ、テストの幅が広がった。",
    created_at: "2025-07-22T15:30:00Z",
    updated_at: "2025-07-22T15:45:00Z",
    deleted_at: null,
  },
  {
    id: 13,
    title: "Gitブランチ戦略",
    user_id: 106,
    summary:
      "Git-flow を参考に、チーム開発におけるブランチ戦略を学習。feature, develop, release, main といったブランチの役割分担を理解し、実際にローカルでブランチを切ってマージする練習を行った。コンフリクトの解決方法も再確認した。",
    created_at: "2025-07-18T09:00:00Z",
    updated_at: "2025-07-18T09:15:00Z",
    deleted_at: null,
  },
  {
    id: 14,
    title: "Webセキュリティ基礎",
    user_id: 103,
    summary:
      "XSS（クロスサイトスクリプティング）や CSRF（クロスサイトリクエストフォージェリ）といった、ウェブアプリケーションの脆弱性について学んだ。入力値のエスケープ処理や、SameSite Cookie 属性の重要性を理解し、安全なアプリケーション設計の基礎を固めた。",
    created_at: "2025-07-15T18:20:00Z",
    updated_at: "2025-07-15T18:30:00Z",
    deleted_at: null,
  },
  {
    id: 15,
    title: "GraphQL入門",
    user_id: 107,
    summary:
      "GraphQL の基本を学習。REST API との違いを理解し、クエリ言語を使って必要なデータだけを効率的に取得する方法を試した。Apollo Server を使って簡単な GraphQL サーバーを立て、クライアントからのリクエストを処理する流れを体験した。",
    created_at: "2025-07-10T14:50:00Z",
    updated_at: "2025-07-10T14:55:00Z",
    deleted_at: null,
  },

  // --- 8月のデータ ---
  {
    id: 16,
    title: "Tailwind CSS実践",
    user_id: 102,
    summary:
      "Tailwind CSS を本格的に導入し、ユーティリティファーストの考え方でUIを構築。`@apply` を使ってコンポーネントのスタイルをまとめる方法や、`tailwind.config.js` をカスタマイズして独自のデザインシステムを作る方法を学んだ。",
    created_at: "2025-08-28T16:00:00Z",
    updated_at: "2025-08-28T16:10:00Z",
    deleted_at: null,
  },
  {
    id: 17,
    title: "Reactパフォーマンス最適化",
    user_id: 101,
    summary:
      "React DevTools の Profiler を使って、コンポーネントのレンダリングパフォーマンスを計測。`React.memo` や `useCallback`, `useMemo` を適切な場面で使い、不要な再レンダリングを抑制する方法を実践的に学んだ。",
    created_at: "2025-08-25T10:20:00Z",
    updated_at: "2025-08-25T10:45:00Z",
    deleted_at: null,
  },
  {
    id: 18,
    title: "Storybookでコンポーネント管理",
    user_id: 109,
    summary:
      "Storybook を導入し、UIコンポーネントをカタログ化。各コンポーネントがどのような props を受け取り、どのように表示されるかを一覧できるようにした。これにより、UIの再利用性と開発効率が大幅に向上した。",
    created_at: "2025-08-20T13:00:00Z",
    updated_at: "2025-08-20T13:15:00Z",
    deleted_at: null,
  },
  {
    id: 19,
    title: "zodでバリデーション",
    user_id: 104,
    summary:
      "zod ライブラリを使って、フォーム入力やAPIレスポンスのスキーマバリデーションを実装。TypeScript との相性が非常に良く、型定義からバリデーションスキーマを生成できるため、コードの安全性が向上した。",
    created_at: "2025-08-12T17:00:00Z",
    updated_at: "2025-08-12T17:05:00Z",
    deleted_at: null,
  },
  {
    id: 20,
    title: "GitHub Actions CI/CD",
    user_id: 110,
    summary:
      "GitHub Actions を使って、CI/CD パイプラインを構築。push や pull request をトリガーに、自動でテストとビルドが実行されるように設定した。簡単なワークフローを YAML で記述し、開発プロセスの自動化を実現した。",
    created_at: "2025-08-05T19:30:00Z",
    updated_at: "2025-08-05T19:40:00Z",
    deleted_at: null,
  },

  // --- 9月のデータ（既存）---
  {
    id: 1,
    title: "React入門",
    user_id: 101,
    summary:
      "本日は React の基本的な考え方を学んだ。特にコンポーネントの分割方法と再利用性について理解を深めることができた。フック（useState, useEffect）を用いて状態管理を行う練習もした。これらを活用することで、単純なカウンターアプリや ToDo リストを効率的に構築できると実感した。",
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-09-01T10:30:00Z",
    deleted_at: null,
  },
  {
    id: 2,
    title: "Next.jsアプリ構築",
    user_id: 102,
    summary:
      "Next.js を使って新しいアプリを構築。SSG（静的サイト生成）と SSR（サーバーサイドレンダリング）の違いを実際に動かして確認した。さらに API Routes を用いて簡単なエンドポイントを作成し、フロントエンドからデータを取得する流れを試した。パフォーマンス計測も行い、CSRとの違いを実感。",
    created_at: "2025-09-02T09:15:00Z",
    updated_at: "2025-09-02T09:20:00Z",
    deleted_at: null,
  },
  {
    id: 3,
    title: "Prisma ORM学習",
    user_id: 101,
    summary:
      "Prisma を使って Postgres データベースと接続し、スキーマ定義からマイグレーションを行った。モデルを追加してリレーションを張る練習も実施。例えば User と Post の関係を one-to-many で表現し、実際にクエリを投げてデータを取得した。Prisma Studio を利用すると GUI でデータの確認ができ、とても便利だった。",
    created_at: "2025-09-03T14:00:00Z",
    updated_at: "2025-09-03T14:10:00Z",
    deleted_at: null,
  },
  {
    id: 4,
    title: "NeonでPostgres",
    user_id: 103,
    summary:
      "Neon を利用してクラウド上に Postgres 環境を用意。接続文字列を取得し、ローカルの Prisma プロジェクトから接続してみた。Neon は無料枠で接続数制限があるため、接続プーリングを有効化する方法についても調べた。データベースのレスポンスは安定しており、学習用には十分だった。",
    created_at: "2025-09-04T18:00:00Z",
    updated_at: "2025-09-04T18:15:00Z",
    deleted_at: null,
  },
  {
    id: 5,
    title: "Auth.jsの使い方",
    user_id: 104,
    summary:
      "Auth.js を使って GitHub 認証を導入した。ログイン後にはセッションが作成され、ユーザー情報がデータベースに保存されることを確認。PrismaAdapter を利用して User や Account テーブルにレコードが作られる流れを学んだ。また、JWT と DB セッションの違いについても調査し、サーバーレス環境では JWT の方が向いていると理解した。",
    created_at: "2025-09-05T11:30:00Z",
    updated_at: "2025-09-05T11:50:00Z",
    deleted_at: null,
  },
  {
    id: 6,
    title: "Firebase Firestore練習",
    user_id: 102,
    summary:
      "Firebase Firestore を使ってデータを追加、更新、削除する処理を練習。React のフォームと組み合わせ、ユーザー入力を Firestore に保存するサンプルアプリを作った。さらにリアルタイムでデータが反映される機能を確認し、Socket を意識せずに動作する点が非常に便利だと感じた。",
    created_at: "2025-09-06T08:40:00Z",
    updated_at: "2025-09-06T08:42:00Z",
    deleted_at: null,
  },
  {
    id: 7,
    title: "TypeScript型入門",
    user_id: 105,
    summary:
      "TypeScript の型注釈について学んだ。変数や関数の引数に型をつけると、開発中にエラーが早期に検出される点が非常に便利。インターフェースと型エイリアスの違いを理解し、オブジェクトの構造を安全に扱えるようになった。また、ジェネリクスを使った型定義により、柔軟な関数を設計できることも実感。",
    created_at: "2025-09-07T21:00:00Z",
    updated_at: "2025-09-07T21:15:00Z",
    deleted_at: null,
  },
  {
    id: 8,
    title: "SQL基礎復習",
    user_id: 106,
    summary:
      "SQL の基礎を復習。SELECT 文でデータを取得し、WHERE 句で条件を絞り込む方法を改めて確認。INNER JOIN と LEFT JOIN を比較し、結合方法によって取得できるレコードがどう変化するかをテーブル例で試した。GROUP BY と HAVING 句を組み合わせて集計クエリを作成する練習も行った。",
    created_at: "2025-09-08T13:25:00Z",
    updated_at: "2025-09-08T13:30:00Z",
    deleted_at: null,
  },
  {
    id: 9,
    title: "UI/UXデザイン勉強",
    user_id: 101,
    summary:
      "Figma を使って新しいアプリのプロトタイプを作成。Auto Layout 機能を使ってレスポンシブデザインを意識し、ボタンやカードコンポーネントを再利用可能な形で作成した。さらに、ユーザーフローを意識して画面遷移を設計し、実際にクリックして動作を確認できるインタラクティブなプロトタイプを作った。",
    created_at: "2025-09-09T15:10:00Z",
    updated_at: "2025-09-09T15:40:00Z",
    deleted_at: null,
  },
  {
    id: 10,
    title: "Docker環境構築",
    user_id: 107,
    summary:
      "Docker Compose を使って Next.js + Postgres の環境を構築した。Dockerfile と docker-compose.yml を作成し、アプリケーションとデータベースがコンテナ上で連携するように設定。ホットリロードの設定に少し苦戦したが、最終的に開発効率を大幅に向上させられることがわかった。コンテナ化により環境差異をなくせる点は非常に大きなメリットだと感じた。",
    created_at: "2025-09-10T17:45:00Z",
    updated_at: "2025-09-10T17:50:00Z",
    deleted_at: null,
  },
];

type ReadingLogList = {
    id : number
    title : string
    user_id : number
    summary : string
    created_at : string
    updated_at : string
    deleted_at : string | null
}
type ReadingLogListPage = {
    logList : ReadingLogList[] ;
}
type ReadingListCardProps = {
    created_at : string
    updated_at : string
    title : string
    summary : string
}
// **要約一覧画面(/books/[authId])**
// - 月選択ボタン
// - 本の画像付きで一覧表示

// export function ReadingList({
//     id , title , user_id , summary_id , created_at , updated_at , deleted_at 
// }:ReadingLogList){
export function ReadingList({
    created_at ,
    updated_at ,
    title ,
    summary
}:ReadingListCardProps){
    return(
        <div className="card">
            <div>
                <div className="card_header">{title}</div>
                <div className="card_summary">{summary}</div>
                <div className="card_created_at">{created_at}</div>
                <div className="card_updated_at">{updated_at}</div>
            </div>
            <div className="arrow">＞</div>
        </div>
        
    )
}
//モックよう
export default function Page(){
    return (
        <Page_1
            logList={mockData}
        />
    )
}

//本来のPage
export function Page_1({
    logList ,
}:ReadingLogListPage){
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

