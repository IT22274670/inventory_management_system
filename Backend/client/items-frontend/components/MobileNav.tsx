import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import {  Home, LineChart, LogOut, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './ui/badge'



const MobileNav = () => {
  return (
    <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Perera Stores</span>
                </Link>
                <Link
                  href="/"
                  className="mx-[-0.65rem] mt-10 flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="category"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Category
                  
                </Link>
                <Link
                  href="/items"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Items
                </Link>
                
              </nav>
              <Link href="#" className='my-10 mx-4 bg-muted mt-auto'>
         <Button className=' font-semibold w-full gap-2' variant="outline">
         <LogOut size={18} />
            Logout
         </Button>
         </Link>
            </SheetContent>
          </Sheet>
  )
}

export default MobileNav