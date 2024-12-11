import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white sticky top-0 z-50 w-[100%]">
      <div className="text-2xl font-bold">Library Manager</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        <NavLink to="/">
          <Button
            variant="link"
            className="text-white hover:text-gray-300 hover:no-underline"
          >
            View Books
          </Button>
        </NavLink>
        <NavLink to="/add">
          <Button
            variant="link"
            className="text-white hover:text-gray-300 hover:no-underline"
          >
            Add Books
          </Button>
        </NavLink>
        {/* <Input type="search" placeholder="Search" className="text-black mx-4" /> */}
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
            <Button
              variant="link"
              className="text-white hover:text-gray-300 hover:no-underline"
            >
              View Books
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-gray-300 hover:no-underline"
            >
              Add Books
            </Button>
            {/* <Input type="search" placeholder="Search" className="text-black" /> */}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
