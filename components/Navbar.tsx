import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { GithubIcon, LucideGithub } from 'lucide-react'


const Navbar = () => {
  return (
    <nav className='flex-between w-full fixed z-50 bg-dark-1 px-6 py-4 lg:px-10'>
      <Link
        className='flex items-center gap-1'
        href="/"
      >
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt='Logo'
          className='max-sm:size-10'
        />
        <p
          className='text-[26px] font-extrabold text-white max-sm:hidden'
        >
          Doom
        </p>
      </Link>
      <div className='flex-between gap-5'>
        <Link href="https://github.com/Skpanda0/Doom" target='_blank' className='text-zinc-300 hover:text-zinc-500'>
          <LucideGithub className='h-fit w-fit'/>
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
