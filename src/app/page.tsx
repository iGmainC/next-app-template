import BasicNavbar from "@/components/nextui-pro/Application/Navbars/BasicNavbar";
import CenteredFooter from "@/components/nextui-pro/Marketing/CenteredFooter";
import { auth } from "./auth";

export default async function Home() {
  let authData = await auth()
  console.log(authData)
  return (
    <main className="min-h-screen flex flex-col">
      <BasicNavbar loginurl="/auth/signin" signupurl="/auth/signup" />
      <div className="grow">
      </div>
      <CenteredFooter/>
    </main>
  );
}
