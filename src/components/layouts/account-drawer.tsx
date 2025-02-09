"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/store/auth/authSlice";
import { fetchCartData } from "@/redux/store/cart";
import { getCartKey, getToken, setCartKey } from "@/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface AccountDrawerProps {
  isOpen: boolean;
  toggleAccountDrawer: () => void;
}

const AccountDrawer: React.FC<AccountDrawerProps> = ({ isOpen, toggleAccountDrawer }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const { displayName, email } = useSelector((state: RootState) => state.auth);
  const { cart_key } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        toggleAccountDrawer();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleAccountDrawer]);

  const handleLogout = async () => {
    try {
      dispatch(logOut());
      toggleAccountDrawer();
      dispatch(fetchCartData());
      toast.success("Logged out!");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-end"
          onClick={toggleAccountDrawer}
        ></div>
      )}

      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[100] h-full bg-transparent transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } max-w-[450px] w-full`}
        aria-labelledby="drawer-right-label"
        tabIndex={-1}
      >
        <div className="flex flex-col w-full h-full bg-gradient-to-r from-[#404040] to-[#292929] p-5 overflow-y-auto">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-lg font-semibold">My Account</h2>
            <button onClick={toggleAccountDrawer} className="text-white">
              <FiX size={24} />
            </button>
          </div>

          <div className="mt-5 p-6 rounded-xl bg-gradient-to-r from-[#121212] to-[#171717] shadow-lg">
            <p className="text-lg font-bold text-white">
              Hello, {isAuthenticated && displayName ? displayName : "guest!"}
            </p>
            <p className="text-sm text-gray-400">{isAuthenticated && email ? email : ""}</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 text-white">
            {isAuthenticated ? (
              <>
                <DrawerLink href="/orders" label="My Orders" onClick={toggleAccountDrawer} />
                <DrawerLink href="/my-profile" label="My Profile" onClick={toggleAccountDrawer} />
                <button
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-r from-[#121212] to-[#171717] hover:bg-gray-50 hover:text-[#b88c4f] shadow-md text-center group transition-all"
                  onClick={() => {
                    handleLogout();
                    // toggleAccountDrawer();
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <DrawerLink href="/login" label="Log In" onClick={toggleAccountDrawer} />
                <DrawerLink href="/register" label="Register" onClick={toggleAccountDrawer} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const DrawerLink: React.FC<{
  href?: string;
  label: string;
  onClick?: () => void;
}> = ({ href, label, onClick }) => (
  <Link
    href={href ? href : "#"}
    onClick={onClick}
    className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-r from-[#121212] to-[#171717] hover:bg-gray-50 hover:text-[#b88c4f] shadow-md text-center group transition-all"
  >
    <p className="text-sm font-medium">{label}</p>
  </Link>
);

export default AccountDrawer;
