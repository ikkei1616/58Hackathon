"use client";


import { useRef, useState, useEffect } from "react";
import { User } from "next-auth";



type Props = {
  userInfo:User
};

const VoiceRecognition = ({userInfo}:Props) => {
  const [title, setTitle ] = useState<string>("");
  const [summary, setSummary ] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // タイマー開始
  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // タイマー停止
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 時間フォーマット関数
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTitle(input)
  }

  const changeSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setSummary(input)
  }

  const postSummary = async () => {
    if (!title.trim() || !summary.trim()) {
      alert("タイトルと要約を入力してください");
      return;
    }

    setIsSaving(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/summarybook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: userInfo.id,
          summary: summary,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to post summary");
      }
      const data = await res.json();
      console.log(data);
      
      // 保存成功時の処理
      setShowSuccessModal(true);
      
    } catch (e){
      console.error(e);
      alert("保存に失敗しました。もう一度お試しください。");
    } finally {
      setIsSaving(false);
    }
  }

  const handleOnRecord = () => {
    if (isRecording) {
      // 録音停止
      setIsRecording(false);
      stopTimer();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // 録音開始
      console.log("start recording...");
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.onresult = function (event) {
        // 認識されたテキストを取得
        const transcript = event.results[0][0].transcript;

        // 認識されたテキストを保存
        setSummary(transcript);
        setIsRecording(false);
        stopTimer();
      };

      recognitionRef.current.onerror = function (event) {
        console.error('音声認識エラー:', event.error);
        setIsRecording(false);
        stopTimer();
      };

      recognitionRef.current.start();
      setIsRecording(true);
      startTimer();
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🎤 音声で要約作成
          </h1>
          <div className="w-16 h-1 bg-[#16A34A] mx-auto rounded-full"></div>
        </div>

        {/* タイトル入力 */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
          <label htmlFor="title-input" className="block text-sm font-medium text-gray-700 mb-3">
            📖 本のタイトル
          </label>
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={changeTitle}
            placeholder="読んだ本のタイトルを入力..."
            className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all duration-200 bg-green-50/30"
          />
        </div>

        {/* 音声認識セクション */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50">
          <div className="text-center space-y-4">
            {/* 録音状態表示 */}
            {isRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">録音中...</span>
                </div>
                
                {/* 経過時間表示 */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="text-2xl font-mono font-bold text-red-600">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-sm text-red-500 mt-1">経過時間</div>
                </div>

                {/* 音波アニメーション */}
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-red-500 rounded-full animate-pulse ${
                        i === 0 ? 'h-6' : i === 1 ? 'h-8' : i === 2 ? 'h-10' : i === 3 ? 'h-8' : 'h-6'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-lg text-gray-600">
                  🗣️ 本の要約を話してください
                </div>
                <div className="text-sm text-gray-500">
                  録音ボタンを押して要約を音声で入力できます
                </div>
              </div>
            )}

            {/* 録音ボタン */}
            <button
              onClick={handleOnRecord}
              className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                  : "bg-[#16A34A] hover:bg-green-700 shadow-green-200"
              }`}
            >
              <div className="text-white text-2xl">
                {isRecording ? "⏹️" : "🎤"}
              </div>
            </button>
            
            <div className="text-sm text-gray-500">
              {isRecording ? "停止" : "録音開始"}
            </div>
          </div>
        </div>

        {/* 要約表示・編集 */}
        {summary && (
          <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50 space-y-4 mb-10">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium text-gray-800">📝 認識された要約</span>
            </div>
            
            <textarea
              value={summary}
              onChange={changeSummary}
              placeholder="要約を編集できます..."
              rows={6}
              className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all duration-200 bg-green-50/30 resize-none"
            />

            <button
              onClick={postSummary}
              disabled={isSaving}
              className={`w-full font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg text-lg ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#16A34A] hover:bg-green-700 shadow-green-200/50 hover:shadow-xl hover:shadow-green-200/70"
              } text-white`}
            >
              {isSaving ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>保存中...</span>
                </div>
              ) : (
                "💾 要約を保存する"
              )}
            </button>
          </div>
        )}
      </div>

      {/* 成功モーダル */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <div className="text-center space-y-4">
              {/* 成功アイコン */}
              <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                <div className="text-white text-2xl">✅</div>
              </div>
              
              {/* メッセージ */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  保存完了！
                </h3>
                <p className="text-gray-600 text-sm">
                  要約が正常に保存されました
                </p>
              </div>

              {/* 保存された内容のプレビュー */}
              <div className="bg-green-50 rounded-xl p-4 text-left">
                <div className="text-sm text-gray-600 mb-1">📖 タイトル</div>
                <div className="font-medium text-gray-800 mb-3 truncate">
                  {title}
                </div>
                <div className="text-sm text-gray-600 mb-1">📝 要約（先頭部分）</div>
                <div className="text-sm text-gray-700 line-clamp-2">
                  {summary.slice(0, 100)}...
                </div>
              </div>

              {/* 閉じるボタン */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setTitle("");
                  setSummary("");
                }}
                className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceRecognition