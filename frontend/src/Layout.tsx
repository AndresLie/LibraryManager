import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>{children}</main>
      </BrowserRouter>
    </>
  );
}

export default Layout;
