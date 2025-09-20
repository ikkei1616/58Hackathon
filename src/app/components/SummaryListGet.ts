type UserIdProps = {
    userId : string
}
export async function ListGet ({userId}:UserIdProps) {
    try {
      const res = await fetch(`http://localhost:3000/api/getAllSummary?authId=${userId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!res.ok) {
        throw new Error("Failed to post summary");
      }
      const data = await res.json();
      console.log(data);
    } catch (e){
      console.error(e);
    }
}
export async SummaryList = async ListGet ();