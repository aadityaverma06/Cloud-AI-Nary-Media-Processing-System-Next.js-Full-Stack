import { SignIn } from "@clerk/nextjs";
export default function Login() {
  return(
  <div className="flex min-h-screen items-center justify-center bg-base-300">
    <SignIn/>
  </div>
  )
}
