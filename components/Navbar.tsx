"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

interface NavbarProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-gray-300">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-2 bg-gray-700 rounded-md">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="text-white hover:text-gray-300">
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className="text-white hover:text-gray-300">
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/favorites" className="text-white hover:text-gray-300">
                      Favorites
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/documents" className="text-white hover:text-gray-300">
                      Additional Documents
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export default Navbar

