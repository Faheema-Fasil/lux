"use client";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/store/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchCartData } from "@/redux/store/cart";
import Button from "@/components/common/button";

const Login = ({
  checkoutPage = false,
  setIsGuestCheckoutSelected,
}: {
  checkoutPage?: boolean;
  setIsGuestCheckoutSelected?: (value: boolean) => void;
}) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus("loading");
    try {
      const userData = {
        username: email,
        password,
      };

      const responseData = await dispatch(loginUser(userData));

      if (loginUser.fulfilled.match(responseData)) {
        setLoginStatus("success");
        toast.success("Login successful");
        dispatch(fetchCartData());
        if (checkoutPage) {
          return;
        }
        router.push("/");
      } else {
        setLoginStatus("error");
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      setLoginStatus("error");
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section
      className=""
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className="pages">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Please enter your email and password to login.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                placeholder="Enter your password"
                required
              />
            </div>
            <p className="mt-4 ">
              <Link
                href="/reset-password"
                className="text-[#b88c4f] hover:underline"
              >
                Forgot password?
              </Link>
            </p>
            <Button buttonText="Login" status={loginStatus} />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </form>
          {checkoutPage && setIsGuestCheckoutSelected && (
            <div className="mt-4 text-center">
              <Link
                href="/register"
                className="w-full mt-5 flex justify-center bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
              >
                Sign up
              </Link>
            </div>
          )}
          {checkoutPage && setIsGuestCheckoutSelected && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-[#b88c4f] hover:underline"
                onClick={() => setIsGuestCheckoutSelected(true)}
              >
                <span>Continue as a guest</span>
              </button>
            </div>
          )}
          {!checkoutPage && (
            <p className="mt-4 text-center">
              <Link href="/register" className="text-[#b88c4f] hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
