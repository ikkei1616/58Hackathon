import type{ ReadingListCardProps } from "@/type";
import Link from "next/link";

export default function SummaryListItem({
  summaryId,
  createdAt,
  updatedAt,
  title,
  summary,
}: ReadingListCardProps) {
  return (
    <Link href={`books/detail/${summaryId}`}>
      <div className="card">
        <div>
          <div className="card_header">{title}</div>
          <div className="card_summary">{summary}</div>
          <div className="card_created_at">{createdAt}</div>
          <div className="card_updated_at">{updatedAt}</div>
        </div>
        <div className="arrow">＞</div>
      </div>
    </Link>
  );
}
