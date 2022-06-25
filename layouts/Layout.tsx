import React, { Children } from "react";
import Navbar from "../components/navbar-components/Navbar";
import Footer from "../components/footer-components/Footer";
const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div >{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
