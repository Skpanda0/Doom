import StreamVideoProvider from '@/providers/StreamCLientProvider'
import { Metadata } from 'next'
import React, {  } from 'react'

export const metadata: Metadata = {
  title: 'Doom',
  description: 'A video confrecing platfrom bulid with love',
  icons: {
    icon:'/icons/logo.svg'
  }
}

const RootLayout = ( {children} : {children : React.ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout