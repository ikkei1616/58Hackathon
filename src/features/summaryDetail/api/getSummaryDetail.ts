
const  getSummaryDetail = async (summaryId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/summaryDetail`,
    {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({summaryId}),
      cache:"no-store",
    }
  );

  const data = await res.json();

  return data;

};

export default getSummaryDetail;