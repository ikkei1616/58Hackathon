import { auth } from "@/auth";
import VoiceRecognition from "@/app/components/VoiceRecognition";
import { User } from "next-auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (user === undefined) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <VoiceRecognition userInfo={user}/>
    </div>
  );
}
