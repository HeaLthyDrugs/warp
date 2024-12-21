'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"
import { 
  Menu,
  Home,
  ListTodo,
  Code2,
  Bot,
  Network,
  Settings,
} from 'lucide-react';

const sidebarLinks = [
  {
    icon: <Home className="w-5 h-5" />,
    route: "/",
    label: "Home",
  },
  {
    icon: <ListTodo className="w-5 h-5" />,
    route: "/task",
    label: "Tasks",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    route: "/snippets",
    label: "Snippets",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    route: "/ai",
    label: "WARP AI",
  },
  {
    icon: <Network className="w-5 h-5" />,
    route: "/integrations",
    label: "Integrations",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    route: "/settings",
    label: "Profile",
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 text-gray-500 cursor-pointer mt-2" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="cursor-pointer flex items-center gap-3 px-4">
            <Image 
              src="/icons/S.png"
              width={34}
              height={34}
              alt="Warp logo"
              className="cursor-pointer rounded-full"
            />
            <h1 className="text-20 font-bold text-gray-500">WARP</h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link 
                        href={item.route}
                        className={cn('mobilenav-sheet_close w-full', {
                          'bg-gray-200': isActive
                        })}
                      >
                        <div className={cn("text-gray-400", {
                          "text-gray-500": isActive
                        })}>
                          {item.icon}
                        </div>
                        <p className={cn("text-16 font-semibold text-gray-400", {
                          "text-gray-500": isActive
                        })}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>
            <Footer />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav