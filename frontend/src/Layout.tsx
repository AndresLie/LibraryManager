import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="mx-[6vw] pt-10">{children}</main>
      </BrowserRouter>
    </>
  );
}

export default Layout;
