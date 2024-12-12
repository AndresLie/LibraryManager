import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";
import { Toaster } from "./components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="mx-[6vw] pt-10">{children}</main>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default Layout;
