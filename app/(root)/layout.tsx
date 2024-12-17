import { getCurrentUser } from "@/appwrite/appwrite";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { AuthContextType, AuthProvider } from "@/context/AuthContext";

import Image from "next/image";
import { redirect } from "next/navigation";

interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  $id: string;
  email: string;
}

async function getAuthUser(): Promise<AuthContextType> {
  try {
      const user = await getCurrentUser();
      const isAuth = Boolean(user);
      return { user, isAuth };
  } catch (error) {
      return { user: null, isAuth: false };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const authUser = await getAuthUser();

  return (
    <AuthProvider initialState={authUser}>
          <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/target.png" width={30} height={30} alt="logo" />
          <div>
            <MobileNav  />
          </div>
        </div>
        {children}
      </div>
    </main>
    </AuthProvider>
  );
}
