'use client'

import { 
  Home,
  ListTodo,
  Code2,
  Bot,
  Network,
  Settings,
} from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Footer from './Footer'

// Update the sidebar links to use Lucide icons
const sidebarLinks = [
  {
    icon: <Home className="w-6 h-6" />,
    route: "/",
    label: "Home",
  },
  {
    icon: <ListTodo className="w-6 h-6" />,
    route: "/task",
    label: "Tasks",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    route: "/snippets",
    label: "Snippets",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    route: "/ai",
    label: "WARP AI",
  },
  {
    icon: <Network className="w-6 h-6" />,
    route: "/integrations",
    label: "Integrations",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    route: "/settings",
    label: "Profile",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image 
            src="/icons/S.png"
            width={34}
            height={34}
            alt="WARP logo"
            className="size-[40px] max-xl:size-14 rounded-full"
          />
          <h1 className="text-26 text-[20px] font-semibold text-gray-500 max-xl:hidden mx-2">WARP</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link href={item.route} key={item.label}
              className={cn('sidebar-link', { 'bg-gray-200': isActive })}
            >
              <div className={cn("text-gray-400", { "text-gray-500": isActive })}>
                {item.icon}
              </div>
              <p className={cn("sidebar-label", { "!text-gray-500": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

export default Sidebar