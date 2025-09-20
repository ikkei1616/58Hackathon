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
    created_at : string
    updated_at : string
    deleted_at : string | null
}

export type ReadingLogListPage = {
    logList : ReadingLogList[] ;
}