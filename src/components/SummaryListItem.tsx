import type{ ReadingListCardProps } from "@/type";
import Link from "next/link";

export default function SummaryListItem({
  summaryId,
  createdAt,
  updatedAt,
  title,
  summary,
}: ReadingListCardProps) {
  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`books/detail/${summaryId}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-50 hover:shadow-xl hover:shadow-green-100/70 transition-all duration-300 hover:border-[#16A34A]/20 group">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* タイトル */}
            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#16A34A] transition-colors duration-200">
              📖 {title}
            </h3>
            
            {/* 要約 */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {summary}
            </p>
            
            {/* 日付情報 */}
            <div className="flex flex-col space-y-1 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>作成: {formatDate(createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>更新: {formatDate(updatedAt)}</span>
              </div>
            </div>
          </div>
          
          {/* 矢印アイコン */}
          <div className="ml-4 flex-shrink-0">
            <div className="w-8 h-8 bg-[#16A34A]/10 rounded-full flex items-center justify-center group-hover:bg-[#16A34A] transition-all duration-200">
              <span className="text-[#16A34A] group-hover:text-white text-sm font-bold transition-colors duration-200">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
