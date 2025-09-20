type ReadingListCardProps = {
    created_at : string
    updated_at : string
    title : string
    summary : string
}

export function ReadingList({
    created_at,
    updated_at,
    title,
    summary
}: ReadingListCardProps) {
    return (
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