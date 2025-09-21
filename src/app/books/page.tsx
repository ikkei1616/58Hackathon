import "./style.css";

import { auth } from "@/auth";
import Summaries from "@/app/components/Summaries";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await auth();
  const user = session?.user;

  // 認証チェック：セッションまたはユーザーが存在しない場合はサインインページにリダイレクト
  if (!session || !user) {
    redirect("/auth/signIn");
  }

  return <Summaries userInfo={user} />;
}
