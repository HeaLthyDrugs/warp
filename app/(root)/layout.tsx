import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { Models } from 'appwrite';

interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  $id: string;
  email: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appwriteUser = await getLoggedInUser();

  if (!appwriteUser) {
    redirect('/connect');
  }

  const user: UserType = {
    userId: appwriteUser.$id,
    firstName: appwriteUser.name.split(' ')[0] || '',
    lastName: appwriteUser.name.split(' ')[1] || '',
    $id: appwriteUser.$id,
    email: appwriteUser.email
  };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user}/>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/target.png" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
