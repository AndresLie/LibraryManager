import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-8 bg-gray-900 text-white sticky top-0 z-50 w-full">
      <a href="/" className="text-white">
        <div className="text-2xl font-bold">Library Manager</div>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4 overflow-hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white hover:text-gray-300 hover:no-underline px-3 py-2 rounded-lg border-2 ${
              isActive ? "text-white border-blue-600   " : ""
            }`
          }
        >
          View Available Books
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `text-white hover:text-gray-300 hover:no-underline px-3 py-2 rounded-lg border-2  ${
              isActive ? "text-white border-blue-600 border-2  " : ""
            }`
          }
        >
          Add Books
        </NavLink>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <span className="material-icons">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 hover:no-underline px-3 py-2 rounded-lg border-2 ${
                  isActive ? "text-white border-blue-600 border-2  " : ""
                }`
              }
            >
              View Available Books
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 hover:no-underline px-3 py-2 rounded-lg border-2 ${
                  isActive ? "text-white border-blue-600 border-2  " : ""
                }`
              }
            >
              Add Books
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
