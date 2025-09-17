"use client"

type LogListCardProps = {
    title : string ;
    explain : string ;
    create_date : {
        year : number ;
        month : number ;
        day : number ;
    };
    change_date : {
        year : number ;
        month : number ;
        day : number ;
    };
}
type ReadingLogListProps = {
    list : LogListCardProps[] ;
}

export default function ReadingLogList({
        list ,
    }:ReadingLogListProps){
    return (
        <>
        </>
    )
}

export function LogListCard({
        title,explain,create_date ,change_date
    }:LogListCardProps){

    return (
        <div>
        </div>
    )
}

