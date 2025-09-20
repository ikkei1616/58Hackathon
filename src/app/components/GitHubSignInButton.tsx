
import { signIn } from "@/auth"

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github",{redirectTo:"/",redirect:true})
      }}
    >
      <button type="submit" style={{cursor: "pointer"}}>Signin with GitHub</button>
    </form>
  )
} 