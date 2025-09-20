import "./style.css";

import { User } from "@/type";
import { auth } from "@/auth";
import Summaries from "@/app/components/Summaries";


export default async function Page() {
  const session = await auth();
  const user = session?.user as User;

  return <Summaries userInfo={user} />;
}
