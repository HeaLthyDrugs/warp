'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'



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
              <div className="relative size-6">
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[2] invert-0': isActive
                  })}
                />
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