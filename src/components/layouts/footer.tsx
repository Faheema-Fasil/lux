"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerTexts } from "@/helper/constants";
import { urlFormatted } from "@/helper/helper";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setShippingCharge } from "@/redux/store/cart/cartSlice";

const Footer = ({ footerData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { quickLinks, customerSupport, startCustomization, about } = footerData;

  dispatch(setShippingCharge(about.int_shipping_charge));

  const pathname = usePathname();
  const isCustomizePage = pathname?.includes("customize") || pathname?.includes("product-detail");

  console.log("footerData", footerData);

  // //console.log("footer", footer);
  // Static data for the Footer
  // const quickLinks = [
  //   { name: "Home", href: "#" },
  //   { name: "About us", href: "#" },
  //   { name: "How it works", href: "#" },
  //   { name: "Shop all", href: "#" },
  //   { name: "Contact Us", href: "#" },
  // ];

  // const customerSupportLinks = [
  //   { name: "FAQs", href: "/faq" },
  //   // { name: "Shipping Information", href: "#" },
  //   { name: "Privacy policy", href: "/privacy-policy" },
  //   // { name: "Terms and conditions", href: "/terms-and-conditions" },
  // ];

  // const customizationLinks = [
  //   { name: "Custom metal cards", href: "/full-custom-metal-card" },
  //   { name: "Business credit cards", href: "/digital-business-credit-card" },
  //   { name: "Dual chip cards", href: "/dual-chip-metal-card" },
  //   { name: "Jewelry cards", href: "jewellery-cards.html" },
  //   { name: "Metallic NFC cards", href: "/metal-nfc" },
  // ];

  // const address = `Oud Metha Road, Umm Hurair 2, Gulf Tower, Block A2, 5th floor, office A14. Dubai-UAE`;

  // const contact = {
  //   phone: "971 55 5555555",
  //   email: "info@luxmetallic.com",
  // };

  const socialLinks = [
    // {
    //   name: "WhatsApp",
    //   href: `${about.whatsapplink}`,
    //   iconSrc: "/assets/img/whatsapp.svg",
    // },
    {
      name: "Facebook",
      href: `${about.fblink}`,
      iconSrc: "/assets/img/facebook.svg",
    },
    {
      name: "Instagram",
      href: `${about.instalink}`,
      iconSrc: "/assets/img/instagram.svg",
    },
    // { name: "Twitter", href: `${about.twitterlink}`, iconSrc: "/assets/img/twitter.svg" },
    {
      name: "YouTube",
      href: `${about.youtubelink}`,
      iconSrc: "/assets/img/youtube.svg",
    },
  ];

  // const paymentIcons = [
  //   { name: "Visa", iconSrc: "/assets/img/visa.png" },
  //   { name: "MasterCard", iconSrc: "/assets/img/mastercard.png" },
  //   { name: "Samsung Pay", iconSrc: "/assets/img/samsungpay.png" },
  //   { name: "Apple Pay", iconSrc: "/assets/img/apple-pay.png" },
  // ];

  // const paymentOptions = Object.keys(about)
  //   .filter((key) => key?.startsWith("paymentoption_") && key?.endsWith("_title"))
  //   .map((key) => {
  //     const baseKey = key.replace("_title", "");
  //     return {
  //       title: about[key],
  //       image: about[`${baseKey}_image`]?.url,
  //     };
  //   });

  const paymentOptions = Object.keys(about)
    .filter((key) => key?.startsWith("paymentoption_") && key?.endsWith("_image"))
    .map((key) => {
      return {
        image: about[key]?.url,
      };
    });

  const partnerLogo = {
    src: `${about.in_cooperation_with.link}`,
    alt: "Dubai SME",
  };

  // const copyrightYear = new Date().getFullYear();

  return (
    <>
      <footer
        data-appear="fade-up"
        data-unload="fade-down"
        className={`text-gray-200 px-3 bg-black ${isCustomizePage ? "hidden" : "block"} `}
        style={{
          position: "relative",
          zIndex: 22,
          background: "radial-gradient(circle, rgb(240 234 209 / 18%) 0%, rgb(0 0 0) 100%)",
          backgroundColor: "#000",
        }}
      >
        <div className="container w-full m-auto text-center py-10 mb-5">
          {about?.sitelogo?.link && (
            <svg width="128" height="110" className="w-32 m-auto" xmlns="http://www.w3.org/2000/svg">
              <image href={about?.sitelogo?.link} width="128" height="128" />
            </svg>
          )}
          <p className="text-sm">{about?.footercaption}</p>
        </div>
        <div className="bringer-footer-widgets border-t border-b">
          <div className="container max-w-screen mx-auto">
            <div className="grid lg:grid-cols-5 gap-3 lg:gap-8">
              <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {quickLinks.items.map((link: { title: string; url: string }) => {
                      const formattedUrl = urlFormatted(link.url);
                      return (
                        <li key={link.title}>
                          <Link href={`/${formattedUrl}`} className="hover:underline">
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
                  <ul className="space-y-2">
                    {customerSupport.items.map((link: any) => {
                      const formattedUrl = urlFormatted(link.url);
                      return (
                        <li key={link.title}>
                          <Link href={`/${formattedUrl}`} className="hover:underline">
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Start Customization</h3>
                  <ul className="space-y-2">
                    {startCustomization.items.map((link: any) => {
                      const formattedUrl = urlFormatted(link.url);

                      return (
                        <li key={link.title}>
                          <Link href={`/${formattedUrl}`} className="hover:underline">
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8  lg:border-l pl-0 lg:pl-8 pb-10 lg:py-10">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Address</h3>
                  <p>{about.footeraddress}</p>
                  <span>
                    {/* {footerTexts.pobox}: {footerTexts.ponumber} */}
                    {about.footerpostbox}
                  </span>
                </div>
                <div className="text-nowrap">
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  {/* <p dangerouslySetInnerHTML={{__html: about.footercontact_}}/> */}
                  <p>
                    {footerTexts.call}:{" "}
                    <a href={`tel:${about.footercontact_}`} className="hover:underline">
                      {about.footercontact_}
                    </a>
                  </p>
                  <p>
                    {footerTexts.email}:{" "}
                    <a href={`mailto:${about.footeremail}`} className="hover:underline">
                      {about.footeremail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b py-4">
          <div className="container max-w-screen-lg mx-auto flex-col md:flex-row  flex gap-5  items-center justify-center px-4">
            <div className="flex space-x-4 items-center justify-center lg:justify-start">
              {paymentOptions.map((icon, index) => (
                <Image key={index} src={icon.image} alt="payment option" width={32} height={32} />
              ))}
            </div>
            <div className="text-center lg:text-left">
              {/* <span>In Cooperation with:</span> */}
              <Image
                src={partnerLogo.src}
                alt={partnerLogo.alt}
                width={80}
                height={32}
                className="inline w-20 h-full mx-2"
              />
            </div>
            <div className="flex justify-center items-center lg:justify-end space-x-6 ">
              {socialLinks.map((link) => (
                <a key={link.name} href={`${link.href}`} target="_blank" rel="noopener noreferrer">
                  <Image src={link.iconSrc} alt={link.name} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="text-sm mt-4 lg:mt-0 text-center py-6">
          © {new Date().getFullYear()} {footerTexts.luxmetallicllc}. {footerTexts.developedby}
          <a href={footerTexts.luxmetalliclink} className="hover:underline">
            {" "}
            {footerTexts.tomsher}
        </a>
        </div> */}
        <div className="text-sm px-3 mt-4 lg:mt-0 text-center py-6">
          © {new Date().getFullYear()} All rights reserved to {footerTexts.luxmetallic}. | Website by
          <a href={footerTexts.luxmetalliclink} className="hover:underline">
            {" "}
            {footerTexts.tomsher}
          </a>
          {/* {about.footer_copyright} */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
