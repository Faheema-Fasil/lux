import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "../../assets/css/custom.css";

import { Red_Hat_Display, Philosopher } from "next/font/google"; // Import Philosopher font

import type { Metadata } from "next";

import Layout from "@/components/layouts";
import { headers } from "next/headers";
import { Suspense } from "react";

import Head from "next/head";
import ReduxProvider from "@/redux/store/provider";
import NextTopLoader from "nextjs-toploader";
import Toastify from "@/components/toast";
import { ProductImageProvider } from "@/components/context/product-image-context";
import Script from "next/script";

const GTM_ID = "GTM-M737XNV";

export const metadata: Metadata = {
  title: "Luxmetallic | Metal Cards",
  description: "Metal Cards",
};

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat-display",
});

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="robots"
          content={`${process.env.NEXT_MODE === "production" ? "index, follow" : "noindex, nofollow"}`}
        />
        <link rel="shortcut icon" href="/src/app/favicon.png" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://luxmetallic.com/" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M737XNV');`}
        </Script>
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M737XNV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Suspense>
          {/* <ReactQueryProvider> */}
          <NextTopLoader color="#b88c4f" />
          <Toastify />
          <ReduxProvider>
            <ProductImageProvider>
              <Layout>{children}</Layout>
              {/*  {children}*/}
            </ProductImageProvider>
          </ReduxProvider>
          {/* </ReactQueryProvider> */}
        </Suspense>
      </body>
    </html>
  );
}
