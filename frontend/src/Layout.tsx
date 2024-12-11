import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="mx-[6vw]">{children}</main>
      </BrowserRouter>
    </>
  );
}

export default Layout;
