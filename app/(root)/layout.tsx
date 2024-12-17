import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

import Image from "next/image";
import { redirect } from "next/navigation";
import { Account, Client, type Models } from 'appwrite';

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


  return (
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
  );
}
