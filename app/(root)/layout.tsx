import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

//"Lume" — Short, simple, and evokes imagery of light, glow, and imagination. It suggests illumination, creativity, and vision, which align well with "simple image imagination."


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />

        <div className='root-container'> 
            <div className='wrapper'>
                {children}
            </div>
        </div>
        <Toaster />
    </main>
  )
}

export default Layout