import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ToTop from "./ToTop";
function Layout() {
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ToTop />
    </div>
  );
}

export default Layout;
