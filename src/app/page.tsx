import { auth } from "@/auth";
import VoiceRecognition from "@/app/components/VoiceRecognition";
import { User } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  // 認証チェック：セッションまたはユーザーが存在しない場合はサインインページにリダイレクト
  if (!session || !user) {
    redirect("/auth/signIn");
  }

  return (
    <div>
      <VoiceRecognition userInfo={user}/>
    </div>
  );
}
