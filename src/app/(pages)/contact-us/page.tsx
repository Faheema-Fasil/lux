import { footerTexts } from "@/helper/constants";
import { fetchContactUsApi, fetchFooterContentApi } from "@/server-api/apifunctions/apiService";
import ContactForm from "@/shared-pages/contact-us/contact-form";
import React from "react";


export const metadata = {
  title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
  description:
    "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
  openGraph: {
    title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
    description:
      "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
    url: "https://www.luxmetallic.com/",
    images: [
      {
        url: "/assets/img/logo.png",
        alt: "Luxmetallic Logo",
      },
    ],
    type: "website",
  },
};

const ContactPage = async () => {
  const data = await fetchContactUsApi();
  const { about: footerData } = await fetchFooterContentApi();

  return (
    <section
      className="pb-20 px-4 md:pt-10 h-auto bg-cover bg-center"
      style={{ backgroundImage: `url("/assets/img/sec-bg.png")` }}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-10 overflow-hidden">
        {/* Banner */}
        <div className="relative w-full h-64">
          <img className="object-cover w-full h-full" src="/assets/img/jewellery-cards/banner.png" alt="Banner" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {data?.acf?.our_products_page_banner_tagline}
            </h1>
            <h2 className="text-base md:text-lg text-white text-center">
              {data?.acf?.our_products_page_banner_description}
            </h2>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white px-6 py-8">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-6 rounded-full flex items-center justify-center">
                  <svg
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    width={40}
                    height={40}
                  >
                    <rect
                      x="-2.4"
                      y="-2.4"
                      width="28.80"
                      height="28.80"
                      rx="14.4"
                      fill="#b88c4f"
                      strokeWidth="0"
                    ></rect>
                    <path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <address className="not-italic text-sm md:text-base text-gray-600">
                  {footerData.footeraddress} <br /> 
                  {footerData.footerpostbox}

                  {/* {footerTexts.pobox}: {footerTexts.ponumber} */}
                </address>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-6 rounded-full flex items-center justify-center my-auto">
                  <svg
                    width={40}
                    height={40}
                    fill="#b88c4f"
                    id="fi_6244710"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                  >
                    <path
                      d="m256 0c141.385 0 256 114.615 256 256s-114.615 256-256 256-256-114.615-256-256 114.615-256 256-256zm162.5 355.241v-190.263l-95.137 95.131zm-304.676 3.876h284.358l-86.908-86.908-33.123 33.118a8.563 8.563 0 0 1 -6.05 2.5h-32.2a8.553 8.553 0 0 1 -6.051-2.5l-33.122-33.118-86.908 86.908zm-20.324-194.145v190.274l95.137-95.137zm312.906-12.089h-300.806l137.844 137.844h25.117z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <a
                  href={`mailto:${footerData.footeremail}`}
                  className="text-sm md:text-base text-gray-600 hover:underline"
                >
                  {footerData.footeremail}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-6 rounded-full flex items-center justify-center">
                  <svg
                    width={40}
                    height={40}
                    fill="#b88c4f"
                    version="1.1"
                    id="fi_455705"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    // style={{ enableBackground: "new 0 0 512 512" }}
                  >
                    <g>
                      <g>
                        <path
                          d="M436.992,74.953c-99.989-99.959-262.08-99.935-362.039,0.055s-99.935,262.08,0.055,362.039s262.08,99.935,362.039-0.055
                                              c48.006-48.021,74.968-113.146,74.953-181.047C511.986,188.055,485.005,122.951,436.992,74.953z M387.703,356.605
                                              c-0.011,0.011-0.022,0.023-0.034,0.034v-0.085l-12.971,12.885c-16.775,16.987-41.206,23.976-64.427,18.432
                                              c-23.395-6.262-45.635-16.23-65.877-29.525c-18.806-12.019-36.234-26.069-51.968-41.899
                                              c-14.477-14.371-27.483-30.151-38.827-47.104c-12.408-18.242-22.229-38.114-29.184-59.051
                                              c-7.973-24.596-1.366-51.585,17.067-69.717l15.189-15.189c4.223-4.242,11.085-4.257,15.326-0.034
                                              c0.011,0.011,0.023,0.022,0.034,0.034l47.957,47.957c4.242,4.223,4.257,11.085,0.034,15.326c-0.011,0.011-0.022,0.022-0.034,0.034
                                              l-28.16,28.16c-8.08,7.992-9.096,20.692-2.389,29.867c10.185,13.978,21.456,27.131,33.707,39.339
                                              c13.659,13.718,28.508,26.197,44.373,37.291c9.167,6.394,21.595,5.316,29.525-2.56l27.221-27.648
                                              c4.223-4.242,11.085-4.257,15.326-0.034c0.011,0.011,0.022,0.022,0.034,0.034l48.043,48.128
                                              C391.911,345.502,391.926,352.363,387.703,356.605z"
                        />
                      </g>
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                  </svg>
                </div>
              </div>
              <div>
                <a
                  href={`tel:${footerData.footercontact_}`}
                  className="text-sm md:text-base text-gray-600 hover:underline"
                >
                  {footerData.footercontact_}
                </a>
              </div>
            </div>
          </div>

          {/* PO Box */}
          {/* <div className="mt-6 text-sm md:text-base text-gray-600 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-6 rounded-full flex items-center justify-center">
                <svg
                  className="w-14 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16m-7 4h7" />
                </svg>
              </div>
            </div>
            <div></div>
          </div> */}
        </div>

        {/* Map */}
        <div className="w-full h-64 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2022.462787412374!2d55.317885853883276!3d25.23533965857631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d33eb90b045%3A0x181bb23636514747!2sGulf%20Towers!5e0!3m2!1sen!2sus!4v1736439110433!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="px-6 py-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

// import { footerTexts } from "@/helper/constants";
// import { fetchContactUsApi, fetchFooterContentApi } from "@/server-api/apifunctions/apiService";
// import ContactForm from "@/shared-pages/contact-us/contact-form";
// import React from "react";

// const ContactPage = async () => {
//   const data = await fetchContactUsApi();
//   const { about: footerData } = await fetchFooterContentApi();
//   console.log("data", data);

//   return (
//     <section
//       className="pb-20 p-2 md:pt-3 h-auto mx-auto bg-cover bg-center"
//       style={{ backgroundImage: `url("/assets/img/sec-bg.png")` }}
//     >
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-10 overflow-hidden">
//         {/* Background Image */}
//         <img className="object-cover w-full h-64" src="/assets/img/jewellery-cards/banner.png" alt="Background Image" />
//         {/* Text Overlay */}
//         <div className="absolute top-0 left-0 w-full h-64 flex flex-col justify-center items-center bg-black bg-opacity-50">
//           <h1 className="text-3xl font-bold text-white mb-2">{data?.acf?.our_products_page_banner_tagline}</h1>
//           <h2 className="text-xl text-white">{data?.acf?.our_products_page_banner_description}</h2>
//         </div>
//         {/* Address Section */}
//         <div className="bg-white w-full px-8 pt-5">
//           <div className=" w-full mb-5 ">
//             <div className="pt-4 grid gap-6 grid-rows-1 md:grid-cols-3">
//               {/* Address */}
//               <div className="flex items-start space-x-4">
//                 <div>
//                   <svg
//                     viewBox="-2.4 -2.4 28.80 28.80"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     stroke="#ffffff"
//                     className="w-8 h-8"
//                   >
//                     <rect
//                       x="-2.4"
//                       y="-2.4"
//                       width="28.80"
//                       height="28.80"
//                       rx="14.4"
//                       fill="#b88c4f"
//                       strokeWidth="0"
//                     ></rect>
//                     <path
//                       d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
//                       stroke="#ffffff"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     ></path>
//                     <path
//                       d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
//                       stroke="#ffffff"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     ></path>
//                   </svg>
//                 </div>
//                 <div>
//                   <address className="not-italic leading-[inherit] text-sm md:text-base text-gray-600">
//                     {footerData.footeraddress}
//                   </address>
//                 </div>
//               </div>

//               {/* Phone and po */}
//               <div className="flex flex-col gap-2">
//                 <div className="flex justify-start md:justify-center flex-col gap-5">
//                   <div>
//                     <div className="text-sm md:text-base text-gray-600 ">
//                       <div className="flex items-center space-x-4 ml-0 md:ml-10">
//                         <svg
//                           width={30}
//                           height={30}
//                           fill="#b88c4f"
//                           id="fi_6244710"
//                           viewBox="0 0 512 512"
//                           xmlns="http://www.w3.org/2000/svg"
//                           data-name="Layer 1"
//                         >
//                           <path
//                             d="m256 0c141.385 0 256 114.615 256 256s-114.615 256-256 256-256-114.615-256-256 114.615-256 256-256zm162.5 355.241v-190.263l-95.137 95.131zm-304.676 3.876h284.358l-86.908-86.908-33.123 33.118a8.563 8.563 0 0 1 -6.05 2.5h-32.2a8.553 8.553 0 0 1 -6.051-2.5l-33.122-33.118-86.908 86.908zm-20.324-194.145v190.274l95.137-95.137zm312.906-12.089h-300.806l137.844 137.844h25.117z"
//                             fillRule="evenodd"
//                           />
//                         </svg>
//                         <div className="text-sm md:text-base text-gray-600">
//                           <a href={`mailto:${footerData.footeremail}`} className="hover:underline">
//                             {footerData.footeremail}
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4 ml-0 md:ml-10">
//                     <svg
//                       width={30}
//                       height={30}
//                       fill="#b88c4f"
//                       version="1.1"
//                       id="fi_455705"
//                       xmlns="http://www.w3.org/2000/svg"
//                       xmlnsXlink="http://www.w3.org/1999/xlink"
//                       viewBox="0 0 512 512"
//                       // style={{ enableBackground: "new 0 0 512 512" }}
//                     >
//                       <g>
//                         <g>
//                           <path
//                             d="M436.992,74.953c-99.989-99.959-262.08-99.935-362.039,0.055s-99.935,262.08,0.055,362.039s262.08,99.935,362.039-0.055
//                                               c48.006-48.021,74.968-113.146,74.953-181.047C511.986,188.055,485.005,122.951,436.992,74.953z M387.703,356.605
//                                               c-0.011,0.011-0.022,0.023-0.034,0.034v-0.085l-12.971,12.885c-16.775,16.987-41.206,23.976-64.427,18.432
//                                               c-23.395-6.262-45.635-16.23-65.877-29.525c-18.806-12.019-36.234-26.069-51.968-41.899
//                                               c-14.477-14.371-27.483-30.151-38.827-47.104c-12.408-18.242-22.229-38.114-29.184-59.051
//                                               c-7.973-24.596-1.366-51.585,17.067-69.717l15.189-15.189c4.223-4.242,11.085-4.257,15.326-0.034
//                                               c0.011,0.011,0.023,0.022,0.034,0.034l47.957,47.957c4.242,4.223,4.257,11.085,0.034,15.326c-0.011,0.011-0.022,0.022-0.034,0.034
//                                               l-28.16,28.16c-8.08,7.992-9.096,20.692-2.389,29.867c10.185,13.978,21.456,27.131,33.707,39.339
//                                               c13.659,13.718,28.508,26.197,44.373,37.291c9.167,6.394,21.595,5.316,29.525-2.56l27.221-27.648
//                                               c4.223-4.242,11.085-4.257,15.326-0.034c0.011,0.011,0.022,0.022,0.034,0.034l48.043,48.128
//                                               C391.911,345.502,391.926,352.363,387.703,356.605z"
//                           />
//                         </g>
//                       </g>
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                       <g />
//                     </svg>
//                     <a href={`tel:${footerData.footercontact_}`} className="text-sm md:text-base text-gray-600 hover:underline">
//                       {footerData.footercontact_}
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-sm md:text-base text-gray-600 flex flex-row justify-start md:justify-center items-center gap-4">
//                 <div>
//                   <svg
//                     version="1.1"
//                     id="Icons"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="-3.2 -3.2 38.40 38.40"
//                     width="30px"
//                     height="30px"
//                     fill="#000000"
//                   >
//                     <g id="SVGRepo_bgCarrier" strokeWidth="0">
//                       <rect
//                         x="-3.2"
//                         y="-3.2"
//                         width="38.40"
//                         height="38.40"
//                         rx="19.2"
//                         fill="#b88c4f"
//                         strokeWidth="0"
//                       ></rect>
//                     </g>
//                     <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
//                     <g id="SVGRepo_iconCarrier">
//                       <style type="text/css">
//                         {`
//           .st0 {
//             fill: none;
//             stroke: #ffffff;
//             stroke-width: 2;
//             stroke-linecap: round;
//             stroke-linejoin: round;
//             stroke-miterlimit: 10;
//           }
//           .st1 {
//             fill: none;
//             stroke: #ffffff;
//             stroke-width: 2;
//             stroke-linejoin: round;
//             stroke-miterlimit: 10;
//           }
//         `}
//                       </style>
//                       <polyline className="st0" points="11,12 21,18 31,12"></polyline>
//                       <line className="st0" x1="4" y1="12" x2="11" y2="12"></line>
//                       <line className="st0" x1="1" y1="16" x2="12" y2="16"></line>
//                       <line className="st0" x1="4" y1="20" x2="11" y2="20"></line>
//                       <path
//                         className="st0"
//                         d="M11,12v-1c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v10c0,2.2-1.8,4-4,4H15c-2.2,0-4-1.8-4-4v-1"
//                       ></path>
//                     </g>
//                   </svg>
//                 </div>
//                 {footerTexts.pobox}: {footerTexts.ponumber}
//               </div>

//               {/* Email */}
//             </div>
//           </div>
//           {/*/column */}
//           <div
//             className="map-container"
//             style={{
//               width: "100%",
//               height: "250px",
//               position: "relative",
//               marginBottom: "20px",
//             }}
//           >
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2022.462787412374!2d55.317885853883276!3d25.23533965857631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d33eb90b045%3A0x181bb23636514747!2sGulf%20Towers!5e0!3m2!1sen!2sus!4v1736439110433!5m2!1sen!2sus"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//         </div>

//         {/* Form */}
//         <ContactForm />
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html:
//             "\n            .radio-button {\n                display: none;\n            }\n\n            .radio-button-label {\n                padding: 10px 20px;\n                border: 2px solid #E5E7EB;\n                border-radius: 9999px;\n                cursor: pointer;\n                margin-right: 10px;\n                margin-bottom: 10px;\n            }\n\n            .radio-button:checked+.radio-button-label {\n                border-color: #b88c4f;\n                color: #b88c4f;\n            }\n        ",
//         }}
//       />
//     </section>
//   );
// };

// export default ContactPage;
