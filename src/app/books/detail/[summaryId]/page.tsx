import SummaryDetail from "@/features/summaryDetail/SummaryDetail";

type Props = {
  params: Promise<{ summaryId: string }>;
};

const App = async ({ params }: Props) => {
  const { summaryId } = await params;
  return (
    <SummaryDetail summaryId= {summaryId}/>
  );
};

export default App;
