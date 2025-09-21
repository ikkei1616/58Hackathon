export type ReadingLogList = {
    id : string
    title : string
    user_id : number
    summary : string
    createdAt : string
    updatedAt : string
    deletedAt : string | null
}

export type ReadingLogListPage = {
    logList : ReadingLogList[] ;
}

export type ReadingListCardProps = {
    summaryId: string;
    createdAt : string
    updatedAt : string
    title : string
    summary : string
}