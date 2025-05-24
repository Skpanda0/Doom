'use client'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <section className='flex flex-col justify-between sticky left-0 w-fit p-6 pt-28 text-white max-sm:hidden lg:w-[264px} bg-dark-1 rounded-lg'>
        <div className='flex flex-1 flex-col gap-6'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

            return(
              <Link 
                href={link.route}
                key={link.label}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start' , {'bg-blue-1': isActive})}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  height={24}
                  width={24}
                />
                <p className='max-lg:hidden text-lg font-semibold'>
                  {link.label}
                </p>
              </Link>
            )
          })}
        </div>
    </section>
  )
}

export default Sidebar