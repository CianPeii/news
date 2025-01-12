import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import ToTop from "./ToTop";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <ToTop />
    </div>
  );
}

export default Layout;
