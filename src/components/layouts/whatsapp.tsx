"use client";
import React, { useState } from "react";
import { WhatsappIcon } from "../icons/whatsapp";
import { buttonTexts } from "@/helper/constants";
import { phoneFormatted } from "@/helper/helper";
import { usePathname } from "next/navigation";

const WhatsappMessageUs = ({ footerData }: any) => {
  const { about } = footerData;
  const sanitizedContact = phoneFormatted(about.footercontact_);
  const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const isCustomizePage = pathname?.includes("customize");

  return (
    <div
      className={`fixed bottom-4 right-4 bg-primary p-2 rounded-md shadow-lg  items-center cursor-pointer z-50 
        transition-all duration-500 ease-in-out ${isCustomizePage ? 'hidden' : 'flex'} ${isHovered ? "p-4" : "p-2"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`https://wa.me/${sanitizedContact}`}
        target="_blank"
        className={`hidden md:flex flex-row items-center space-x-2 text-[#746C6C] transition-all duration-300 ease-in-out 
          ${isHovered ? "opacity-100" : "opacity-80 pointer-events-none"}`}
      >
        <WhatsappIcon />
        <span className="text-white">{buttonTexts.messageus}<span className="sr-only">WhatsApp</span></span>
      </a>
      <a
        href={`https://wa.me/${sanitizedContact}`}
        target="_blank"
        className="md:hidden flex flex-row items-center"
      >
        <span className="sr-only">WhatsApp</span><WhatsappIcon />
      </a>
    </div>
  );
};

export default WhatsappMessageUs;

