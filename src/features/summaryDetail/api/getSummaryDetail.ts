const getSummaryDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/summaryDetail`, {
      method: "POST", // POSTに変更（bodyを送るため）
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summaryId: id }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("getSummaryDetails Error:", error);
    throw error; 
  }
};

export default getSummaryDetails;
