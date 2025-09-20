import { auth } from "@/auth";
import VoiceRecognition from "@/app/components/VoiceRecognition";
import { User } from "@/type/index";

import List from "@/app/components/SummaryListGet";

export default async function Home() {
  const session = await auth();
  const user = session?.user as User;

  console.log(user);

  return (
    <div>
      <VoiceRecognition userInfo={user}/>
    </div>
  );
}
