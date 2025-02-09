"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const MobileSidebar = ({
  isMobileNavbarOpen,
  toggleMobileNavbarDrawer,
  menu,
}: {
  isMobileNavbarOpen: boolean;
  toggleMobileNavbarDrawer: () => void;
  menu: any;
}) => {
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileDrawerRef.current && !mobileDrawerRef.current.contains(event.target as Node)) {
        toggleMobileNavbarDrawer();
      }
    };

    if (isMobileNavbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileNavbarOpen, toggleMobileNavbarDrawer]);

  return (
    <>
      {isMobileNavbarOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50" onClick={toggleMobileNavbarDrawer}></div>
      )}

      <div
        ref={mobileDrawerRef}
        className={`fixed top-0 right-0 z-[100] h-full bg-black p-5 overflow-y-auto transition-transform duration-300 ${
          isMobileNavbarOpen ? "translate-x-0" : "translate-x-full"
        } max-w-[450px] w-full`}
      >
        <div className="flex justify-end items-center text-white">
          <button onClick={toggleMobileNavbarDrawer} className="text-white">
            <FiX size={24} />
          </button>
        </div>

        <ul className="mt-10 space-y-4 text-white">
          {menu.items.map((item: { ID: number; title: string; url: string }) => {
            const url = item.url && item.url.startsWith("http") ? item.url : "#";
            const lastSegment = url.split("/").filter(Boolean).pop() || "default";

            return (
              <li key={item.ID}>
                <Link
                  className="uppercase text-white hover:text-primary"
                  href={`/${lastSegment}`}
                  onClick={toggleMobileNavbarDrawer}
                >
                  {item.title || "Untitled"}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              className="uppercase text-white hover:text-primary"
              href={`/contact-us`}
              onClick={toggleMobileNavbarDrawer}
            >
              {'Contact us'}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileSidebar;
