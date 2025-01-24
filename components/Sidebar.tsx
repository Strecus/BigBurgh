import type React from "react"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white text-navy-blue transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button onClick={toggleSidebar} className="text-navy-blue hover:text-gold text-2xl">
          ✕
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link
              href="/about"
              className="block py-2 px-4 text-lg hover:bg-navy-blue hover:text-gold rounded transition duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-4 text-lg hover:bg-navy-blue hover:text-gold rounded transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

