"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetPasswordApi } from "@/server-api/apifunctions/apiService";

const SetPassword = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [key, setKey] = useState("");
  const [login, setLogin] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }

    const urlKey = searchParams.get("key");
    const urlLogin = searchParams.get("login");

    if (urlKey && urlLogin) {
      setKey(urlKey);
      setLogin(urlLogin);
    } else {
      toast.error("Invalid reset link.");
      router.push("/"); // Redirect if the required params are missing
    }
  }, [isAuthenticated, router, searchParams]);

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setStatus("loading");
      const res = await resetPasswordApi(key, login, formData.newPassword);

      if (res.data) {
        setStatus("success");
        toast.success("Password reset successfully. You can now log in.");
        router.push("/login");
      } else {
        toast.error(res.data?.message || "Failed to reset password.");
        setStatus("error");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        (err as { response: { data: { message: string } } }).response.data
          .message || "An error occurred."
      );
      setStatus("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleResetPassword();
  };

  return (
    <section
      className="p-24"
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Set Password
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Enter your new password below to set your account password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold">
                New Password *
              </label>
              <input
                type="password"
                name="newPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold">
                Confirm New Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 flex justify-center bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
            >
              {status === "loading" ? (
                <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                <span>Set Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SetPassword;
