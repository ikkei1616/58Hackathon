import GitHubSignInButton from "@/app/components/GitHubSignInButton"

const page = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* ヘッダーセクション */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-[#16A34A] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-200/50">
              <span className="text-3xl text-white">📚</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            読書記録アプリ
          </h1>
          <p className="text-gray-600 text-lg">
            🎤 音声で簡単に本の要約を記録
          </p>
          <div className="w-16 h-1 bg-[#16A34A] mx-auto rounded-full mt-4"></div>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-xl shadow-green-100/50 p-8 border border-green-50">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              アカウントでログイン
            </h2>
            <p className="text-gray-500 text-sm">
              GitHubアカウントで簡単にログインできます
            </p>
          </div>

          {/* サインインボタン */}
          <GitHubSignInButton />
          
          {/* 機能紹介 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
              ✨ アプリの機能
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">🎤</span>
                </div>
                <span className="text-sm text-gray-600">音声で本の要約を簡単記録</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">📖</span>
                </div>
                <span className="text-sm text-gray-600">読書記録の一覧表示・管理</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">⏰</span>
                </div>
                <span className="text-sm text-gray-600">月別での読書履歴の確認</span>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
          </p>
        </div>
      </div>
    </div>
  )
}

export default page