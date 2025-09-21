import "./style.css";

import { auth } from "@/auth";
import Summaries from "@/app/components/Summaries";


export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (user === undefined) {
    return <div>Please sign in</div>;
  }

  return <Summaries userInfo={user} />;
}
