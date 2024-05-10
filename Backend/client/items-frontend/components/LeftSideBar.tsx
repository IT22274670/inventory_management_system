import React from 'react'
import Link from "next/link"
import {
  Bell,
  Home as HomeIcon,
  LineChart,
  LogOut,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"



const LeftSideBar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Perera Stores</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/category"
                className="flex items-center gap-3 rounded-lg px-3 hover:bg-muted py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Category
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              <Link
                href="/items"
                className="flex items-center gap-3 rounded-lg hover:bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Items{" "}
              </Link>
              
            </nav>
          </div>
          <Link href="#" className='my-10 mx-4 bg-muted '>
         <Button className=' font-semibold w-full gap-2' variant="outline">
         <LogOut size={18} />
            Logout
         </Button>
         </Link>
        </div>
      </div>
  )
}

export default LeftSideBar