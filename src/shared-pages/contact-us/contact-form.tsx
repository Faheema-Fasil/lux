// "use client";
// import { useState } from "react";
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";
// import { contactUsFormApi } from "@/server-api/apifunctions/apiService";
// import Button from "@/components/common/button";
// import { toast } from "react-toastify";

// const ContactForm = () => {
//   const { displayName, email } = useSelector((state: RootState) => state.auth);
//   const { customer } = useSelector((state: RootState) => state.cart);
//   const [name, setName] = useState(displayName);
//   const [emailState, setEmail] = useState(email.length > 0 ? email : "");
//   const [phone, setPhone] = useState(
//     customer.billing_address.billing_phone.length > 0
//       ? customer.billing_address.billing_phone
//       : ""
//   );
//   const [subject, setSubject] = useState("general");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "success"
//   );
  

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();
//     setStatus("loading");

//     const formData = {
//       name,
//       email: emailState,
//       phone,
//       subject: "Contact",
//       message,
//     };

//     if (!name || !emailState || !phone || !subject || !message) {
//       setStatus("error");
//       toast.error("Please fill out all the fields.");
//       return;
//     }

//     try {
//       const response = await contactUsFormApi(formData);
//       if (response) {
//         setStatus("success");
//         toast.success(response);
//         setName("");
//         setEmail("");
//         setPhone("");
//         // setSubject("");
//         setMessage("");
//       } else {
//         toast.error("Failed to send the message. Please try again.");
//       }
//     } catch (error) {
//       setStatus("error");
//       toast.error("Something went wrong. Please try again .");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="pt-0 px-0 md:px-8 pb-8 mt-2">
//           {/* Name Field */}
//           <div className="input-item mb-5">
//             <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
//               Name *
//             </label>
//             <input
//               className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2  focus:border-primary focus:ring-primary"
//               type="text"
//               name="name"
//               onChange={(event) => setName(event.target.value)}
//               value={name}
//             />
//           </div>
//           {/* Email Field */}
//           <div className="input-item mb-5">
//             <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
//               Email *
//             </label>
//             <input
//               className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2  focus:border-primary focus:ring-primary"
//               type="email"
//               name="email"
//               onChange={(event) => setEmail(event.target.value)}
//               value={emailState}
//             />
//           </div>
//           {/* Phone Field */}
//           <div className="input-item mb-5">
//             <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
//               Phone *
//             </label>
//             <input
//               className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2  focus:border-primary focus:ring-primary"
//               type="number"
//               maxLength={12}
//               name="phone"
//               onChange={(event) => setPhone(event.target.value)}
//               value={phone}
//             />
//           </div>
//           {/* Radio Buttons */}
//           {/* <div className="mb-4">
//             <label className="input-label block mb-4 text-gray-700 text-sm font-medium">
//               Subject *
//             </label>
//             <div className="grid grid-cols-2 gap-4 text-center">
//               <input
//                 type="radio"
//                 id="compliance"
//                 name="subject"
//                 className="radio-button"
//                 defaultValue="compliance"
//                 onChange={(event) => setSubject(event.target.value)}
//                 checked={subject === "compliance"}
//               />
//               <label
//                 htmlFor="compliance"
//                 className="radio-button-label p-3 rounded-lg cursor-pointer hover:bg-[#e4dfc9] peer-checked:bg-[#b88c4f] text-black border-[#b88c4f] peer-checked:text-white transition-colors duration-300 ease-in-out"
//               >
//                 Compliance
//               </label>
//               <input
//                 type="radio"
//                 id="order-status"
//                 name="subject"
//                 className="radio-button"
//                 defaultValue="order-status"
//                 onChange={(event) => setSubject(event.target.value)}
//                 checked={subject === "order-status"}
//               />
//               <label
//                 htmlFor="order-status"
//                 className="radio-button-label p-3 rounded-lg cursor-pointer hover:bg-[#e4dfc9] peer-checked:bg-[#b88c4f] text-black border-[#b88c4f] peer-checked:text-white transition-colors duration-300 ease-in-out"
//               >
//                 Order Status
//               </label>
//               <input
//                 type="radio"
//                 id="returns"
//                 name="subject"
//                 className="radio-button"
//                 defaultValue="returns"
//                 onChange={(event) => setSubject(event.target.value)}
//                 checked={subject === "returns"}
//               />
//               <label
//                 htmlFor="returns"
//                 className="radio-button-label p-3 rounded-lg cursor-pointer hover:bg-[#e4dfc9] peer-checked:bg-[#b88c4f] text-black border-[#b88c4f] peer-checked:text-white transition-colors duration-300 ease-in-out"
//               >
//                 Returns
//               </label>
//               <input
//                 type="radio"
//                 id="product"
//                 name="subject"
//                 className="radio-button"
//                 defaultValue="product"
//                 onChange={(event) => setSubject(event.target.value)}
//                 checked={subject === "product"}
//               />
//               <label
//                 htmlFor="product"
//                 className="radio-button-label p-3 rounded-lg cursor-pointer hover:bg-[#e4dfc9] peer-checked:bg-[#b88c4f] text-black border-[#b88c4f] peer-checked:text-white transition-colors duration-300 ease-in-out"
//               >
//                 Product Information
//               </label>
//             </div>
//           </div> */}
//           {/* Message Field */}
//           <div className="input-item mb-5">
//             <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
//               Message *
//             </label>
//             <textarea
//               className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2  focus:border-primary focus:ring-primary h-32"
//               name="message"
//               onChange={(event) => setMessage(event.target.value)}
//               value={message}
//             />
//           </div>
//           {/* Buttons */}
//           <div className="mt-5 flex justify-between items-center">
//             <Button status={status} buttonText="Submit" />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

"use client";

import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { contactUsFormApi } from "@/server-api/apifunctions/apiService";
import Button from "@/components/common/button";
import { toast } from "react-toastify";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LcI08gqAAAAABfDDJlPU8SLF5E1i2aT65yE_AcO";

const ContactForm = () => {
  const { displayName, email } = useSelector((state: RootState) => state.auth);
  const { customer } = useSelector((state: RootState) => state.cart);
  const [name, setName] = useState(displayName);
  const [captchaSize, setCaptchaSize] = useState<"compact" | "normal">("normal");
  const [emailState, setEmail] = useState(email.length > 0 ? email : "");
  const [phone, setPhone] = useState(
    customer.billing_address.billing_phone.length > 0
      ? customer.billing_address.billing_phone
      : ""
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "success"
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [captchaScale, setCaptchaScale] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      const newScale = window.innerWidth < 500 ? 0.8 : 1; // Scale down on small screens
      setCaptchaScale(newScale);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };


  useEffect(() => {
    const updateSize = () => {
      setCaptchaSize(window.innerWidth < 500 ? "compact" : "normal");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setStatus("loading");

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification.");
      setStatus("error");
      return;
    }

    if (!name || !emailState || !phone || !message) {
      setStatus("error");
      toast.error("Please fill out all the fields.");
      return;
    }

    const formData = {
      name,
      email: emailState,
      subject: "Contact",
      phone,
      message,
      captchaToken,
    };

    try {
      const response = await contactUsFormApi(formData);
      if (response) {
        setStatus("success");
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setCaptchaToken(null);
      } else {
        toast.error("Failed to send the message. Please try again.");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="pt-0 px-0 md:px-8 pb-8 mt-2">
          {/* Name Field */}
          <div className="input-item mb-5">
            <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
              Name *
            </label>
            <input
              className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:border-primary focus:ring-primary"
              type="text"
              name="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>

          {/* Email Field */}
          <div className="input-item mb-5">
            <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
              Email *
            </label>
            <input
              className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:border-primary focus:ring-primary"
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              value={emailState}
            />
          </div>

          {/* Phone Field */}
          <div className="input-item mb-5">
            <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
              Phone *
            </label>
            <input
              className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:border-primary focus:ring-primary"
              type="number"
              maxLength={12}
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
            />
          </div>

          {/* Message Field */}
          <div className="input-item mb-5">
            <label className="input-label block mb-2 text-gray-700 text-sm font-medium">
              Message *
            </label>
            <textarea
              className="input-field placeholder-gray-400 text-sm px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:border-primary focus:ring-primary h-32"
              name="message"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
          </div>

          {/* Google reCAPTCHA */}
           <div className="flex justify-center my-4">
      <div
        className="captcha-container"
        style={{
          transform: `scale(${captchaScale})`,
          transformOrigin: "center",
        }}
      >
        <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
      </div>
    </div>

          {/* Submit Button */}
          <div className="mt-5 flex justify-between items-center">
            <Button status={status} buttonText="Submit"  />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
