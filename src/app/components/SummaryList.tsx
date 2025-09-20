import { ReadingListCardProps } from "@/type";

export default function SummaryList({
  createdAt,
  updatedAt,
  title,
  summary,
}: ReadingListCardProps) {
  return (
    <div className="card">
      <div>
        <div className="card_header">{title}</div>
        <div className="card_summary">{summary}</div>
        <div className="card_created_at">{createdAt}</div>
        <div className="card_updated_at">{updatedAt}</div>
      </div>
      <div className="arrow">＞</div>
    </div>
  );
}
