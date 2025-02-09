"use client";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
  changePasswordApi,
  loginUserApi,
} from "@/server-api/apifunctions/apiService";
import Link from "next/link";
import { toast } from "react-toastify";
import Button from "@/components/common/button";

const ChangePassword = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { email } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);

  const verifyOldPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const userData = {
        username: email,
        password: oldPassword,
      };
      const isValid = await loginUserApi(userData);
      if (isValid) {
        setShowNewPasswordFields(true);
      } else {
        toast.error("Password is incorrect.");
      }
      setStatus("idle");
    } catch (error) {
      setError("Verification failed.");
      toast.error("Password is incorrect.");
      setStatus("error");
    }
  };

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (newPassword.length < 5) {
      toast.error("New password must be at least 5 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setStatus("loading");
    try {
      await changePasswordApi(newPassword);
      toast.success("Password changed successfully.");
      setStatus("success");
      router.push("/");
    } catch (error) {
      setError("Password change failed.");
      setStatus("error");
    }
  };

  return (
    <section
      className="pages"
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className=" mx-auto ">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Change Your Password
          </h2>
          {!showNewPasswordFields ? (
            <form onSubmit={verifyOldPassword}>
              <div className="mb-4">
                <label className="block text-gray-800 font-semibold">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your old password"
                />
              </div>
              <Button buttonText="Verify" status={status} />
              {/* {error && <p className="text-red-600 text-sm mt-1">{error}</p>} */}
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-gray-800 font-semibold">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 font-semibold">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Confirm your new password"
                />
              </div>
              <Button buttonText="Change Password" status={status} />
            </form>
          )}
          <div className="mt-4 text-center">
            <Link href="/" className="text-[#b88c4f] hover:underline">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;



