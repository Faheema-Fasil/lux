"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RegisterFormProps } from "@/helper/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducer";
import { registerUserApi } from "@/server-api/apifunctions/apiService";
import Link from "next/link";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import countriesList from "@/helper/country";
import PhoneNumberInput from "@/components/common/phone-number";
import { loginUser } from "@/redux/store/auth";
import { fetchCartData } from "@/redux/store/cart";
import { AppDispatch } from "@/redux/store";

const Register = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch: AppDispatch = useDispatch();

  const [registerStatus, setRegisterStatus] = useState<
    "submitting" | "success" | "error"
  >();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [userData, setUserData] = useState<RegisterFormProps>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    billing: {
      phone: "",
      country: "",
    },
    shipping: {
      country: "",
    },
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.confirm_password ||
      !userData.billing.phone
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (userData.password !== userData.confirm_password) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    if (!/^\d{10,12}$/.test(userData.billing.phone)) {
      toast.error(
        "Phone number should be between 10 to 12 digits with country code"
      );
      return;
    }

    try {
      setRegisterStatus("submitting");
      const registerResponse = await registerUserApi(userData);
      if (registerResponse.date_created && registerResponse.id) {
        setRegisterStatus("success");
        toast.success("Registered successfully.");

        // Attempt to log in the user immediately after successful registration
        const loginResponse = await dispatch(loginUser(userData));
        if (loginUser.fulfilled.match(loginResponse)) {
          toast.success("Login successful");
          dispatch(fetchCartData());
          router.push("/");
        } else {
          setRegisterStatus("error");
          toast.error("Login failed");
        }
      } else {
        setRegisterStatus("error");
        toast.error(registerResponse.error || "Registration failed");
      }
    } catch (error) {
      let errMsg: any = "An unknown error occurred";
      if (error) {
        errMsg = error || errMsg;
      }
      setRegisterStatus("error");
      toast.error(errMsg);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setUserData((prevData) => {
      const keys = name.split(".");

      if (keys.length === 2) {
        const [parentKey, childKey] = keys;

        return {
          ...prevData,
          [parentKey]: {
            ...((prevData[parentKey as keyof typeof prevData] as Record<
              string,
              any
            >) || {}),
            [childKey]: value,
          },
        };
      }

      return { ...prevData, [name]: value };
    });
  };

  return (
    <section
      className="pages "
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Signup to Enter
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            New to our platform? Complete the details below.
            <br />
            Already a member?{" "}
            <Link href="login" className="text-[#b88c4f] hover:underline">
              Please log in
            </Link>
          </p>

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 font-semibold">
                  Name *
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your name"
                  value={userData.username || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 font-semibold">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your password"
                  value={userData.password || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your confirm password"
                  value={userData.confirm_password || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 font-semibold">
                  Phone Number *
                </label>
                {/* <PhoneNumberInput handleInputChange={handleChange} phoneNumberValue={userData.billing.phone} /> */}
                <input
                  type="tel"
                  name="billing.phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  placeholder="Enter your phone number"
                  value={userData.billing?.phone || ""}
                  onChange={handleChange}
                  required
                  pattern="^\d{10,12}$"
                />
                <p className="text-sm text-gray-600">
                  Please enter 10 to 12 digits.
                </p>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold">
                  Country *
                </label>
                <select
                  name="shipping.country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                  value={userData.shipping?.country || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Country --</option>
                  {countriesList.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={registerStatus === "submitting"}
              className="w-full bg-[#b88c4f] flex justify-center text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
            >
              {registerStatus === "submitting" ? (
                <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
