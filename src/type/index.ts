export type User = {
  id: string;
  name? :string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type ReadingLogList = {
    id : number
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
    createdAt : string
    updatedAt : string
    title : string
    summary : string
}