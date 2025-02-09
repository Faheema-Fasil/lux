import React from "react";
import Footer from "./footer";
import { Fragment } from "react";
import Header from "./header";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import {
  fetchFooterContentApi,
  fetchMenuApi,
} from "@/server-api/apifunctions/apiService";
import WhatsappMessageUs from "./whatsapp";
import ScrollToTop from "../common/scroll-to-top";

type LayoutProps = {
  children: React.ReactNode;
  // hostName: string | null;
};

const Layout = async ({ children }: LayoutProps) => {
  const apiEndpointNavbar = apiEndpoints.menu.navbar;
  const menu = await fetchMenuApi(apiEndpointNavbar);
  const footerData = await fetchFooterContentApi();

  return (
    <Fragment>
      <div className="relative">
        <Header menu={menu} footerData={footerData} />
        <div className="font-[Philosopher] text-black">{children}</div>
        <Footer footerData={footerData} />
        <WhatsappMessageUs footerData={footerData} />
      </div>
    </Fragment>
  );
};

export default Layout;
