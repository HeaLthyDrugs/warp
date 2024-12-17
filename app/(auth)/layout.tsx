import { getCurrentUser } from "@/appwrite/appwrite.server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if user is already authenticated
  const user = await getCurrentUser();
  
  if (user) {
    redirect("/");
  }

  return (
    <main>
      {children}
    </main>
  );
}
  