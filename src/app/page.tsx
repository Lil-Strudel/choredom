import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import App from "./_components/app";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <App session={session} />;
}
