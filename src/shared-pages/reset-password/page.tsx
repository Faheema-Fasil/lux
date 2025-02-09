"use client";
import React, { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { ResetPasswordFormProps } from "@/types/auth/auth-types";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { forgotPasswordApi } from "@/server-api/apifunctions/apiService";
import { RootState } from "@/redux/store";

const ResetPassword = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">();
  const [formData, setFormData] = useState<ResetPasswordFormProps>({
    email: "",
  });

  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleForgotPassword = async (email: string) => {
    try {
      setStatus("loading");
      const res = await forgotPasswordApi(email);
      if (res.data) {
        setStatus("success");
        toast.success("Check your email for the password reset link.");
      } else {
        toast.error(res.data?.message);
        setStatus("error");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        (err as { response: { data: { message: string } } }).response.data
          .message
      );
      setStatus("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;
    // if (!emailRegex.test(formData.email)) {
    //   toast.error("Invalid email format");
    //   return;
    // }
    await handleForgotPassword(formData.email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;
    // if (!emailRegex.test(value)) {
    //   toast.error("Invalid email format");
    // }
    setFormData({ ...formData, email: value });
  };

  return (
    <section
      className="py-5 md:p-24"
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Reset Password
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold">
                Email *
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
            >
              {status === "loading" ? "Loading..." : "Send"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link href="register" className="text-[#b88c4f] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

