import { fetchPrivacyPolicyApi } from "@/server-api/apifunctions/apiService";
import React from "react";

// const privacyData = [
//   {
//     title: "Introduction",
//     content:
//       "Welcome to LuxMetallic Prepaid Cards Management Services. Your privacy is very important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when you use our customized ATM card services and visit our website.",
//   },
//   {
//     title: "Information We Collect",
//     content: [
//       {
//         subTitle: "Personal Information",
//         text: "Full name, contact details (email address, phone number, and mailing address), and identity verification data (such as government-issued IDs).",
//       },
//       {
//         subTitle: "Financial Information",
//         text: "Payment card details and banking information for processing payments related to card customization services.",
//       },
//       {
//         subTitle: "Card Customization Data",
//         text: "Custom designs, preferences, and uploaded images for ATM card personalization.",
//       },
//       {
//         subTitle: "Usage Information",
//         text: "Information related to your interactions with our website, including browser type, IP address, pages visited, and service usage.",
//       },
//       {
//         subTitle: "Cookies and Tracking Technologies",
//         text: "We use cookies to enhance your experience and analyze website traffic.",
//       },
//     ],
//   },
//   {
//     title: "How We Use Your Information",
//     content: [
//       {
//         subTitle: "Providing Our Services",
//         text: "To create and deliver your customized ATM cards, including managing card design submissions and processing orders.",
//       },
//       {
//         subTitle: "Transaction Processing",
//         text: "For billing, payments, and verifying transactions related to your customized ATM card.",
//       },
//       {
//         subTitle: "Customer Support",
//         text: "To respond to inquiries, manage your account, and provide support related to your card orders.",
//       },
//       {
//         subTitle: "Service Improvement",
//         text: "To analyze how you interact with our website and services, and improve the overall user experience.",
//       },
//       {
//         subTitle: "Legal Compliance",
//         text: "To comply with applicable legal and regulatory requirements.",
//       },
//     ],
//   },
//   {
//     title: "How We Share Your Information",
//     content: [
//       {
//         subTitle: "Service Providers",
//         text: "We may share your data with third-party providers involved in card manufacturing, payment processing, and delivery services to fulfill your customized ATM card order.",
//       },
//       {
//         subTitle: "Legal Requirements",
//         text: "We may disclose your information to comply with legal obligations or to protect our rights in case of disputes or legal inquiries.",
//       },
//       {
//         subTitle: "Business Transfers",
//         text: "In the event of a business transaction such as a merger or acquisition, your information may be transferred as part of the assets.",
//       },
//     ],
//   },
//   {
//     title: "Security of Your Information",
//     content:
//       "We prioritize the security of your personal and financial information. We implement robust security measures including encryption, secure servers, and access controls to protect your data from unauthorized access or breaches.",
//   },
//   {
//     title: "Your Data Protection Rights",
//     content: [
//       "The right to access, correct, or delete your personal information.",
//       "The right to object to the processing of your data.",
//       "The right to withdraw consent to data processing.",
//       "The right to request data portability.",
//     ],
//   },
//   {
//     title: "Cookies and Tracking Technologies",
//     content:
//       "Our website uses cookies to track user activity and store information about your preferences. You can manage or disable cookies through your browser settings.",
//   },
//   {
//     title: "Changes to This Privacy Policy",
//     content:
//       "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically to stay informed about how we protect your privacy.",
//   },
//   {
//     title: "Contact Us",
//     content: [
//       {
//         subTitle: "Email",
//         text: "info@luxmetallic.com",
//         link: "mailto:info@luxmetallic.com",
//       },
//       {
//         subTitle: "Phone",
//         text: "+971 4 832 8892",
//       },
//       {
//         subTitle: "Address",
//         text: "Oud Metha Road, Umm Hurair 2, Gulf Tower, Block A2, 5th Floor, Office A14, Dubai, UAE",
//       },
//     ],
//   },
// ];

const PrivacyPolicy = async() => {
  const privacyPolicyData = await fetchPrivacyPolicyApi();
  
  return (
    // <section className="lx-faq bg-white py-16 w-full px-0" style={
    //     {
    //         backgroundImage: "url('/assets/img/sec-bg.png')",
    //         backgroundSize: '4500px',
    //         backgroundPosition: 'center',
    //     }
    // }>
    //   <div className="container mx-auto px-4 md:px-6 lg:px-8">
    //     {/* Page Container */}
    //     <div className="bg-gray-100 py-8 px-4 text-black">
    //       {/* Header */}
    //       <header className="text-center mb-8">
    //         <h1 className="text-4xl font-bold text-black">Privacy Policy</h1>
    //         <p className="mt-4 text-lg text-gray-700">Effective Date: January 1, 2024</p>
    //       </header>

    //       {/* Map through privacy data */}
    //       {privacyData.map((section, index) => (
    //         <section key={index} className="bg-white p-8 shadow-md rounded-lg mb-8">
    //           <h3 className="text-3xl font-semibold mb-4 text-black">{section.title}</h3>
    //           {Array.isArray(section.content) ? (
    //             <ul className="list-disc list-inside text-lg space-y-2 ps-[20px]">
    //               {section.content.map((item: any, idx: any) => (
    //                 <li key={idx}>
    //                   <strong className="text-black">{item.subTitle || item}</strong>
    //                   {item.text ? (
    //                     <p>{item.text}</p>
    //                   ) : (
    //                     item.link ? (
    //                       <a href={item.link} className="text-[#b88c4f] hover:underline">{item.text}</a>
    //                     ) : null
    //                   )}
    //                 </li>
    //               ))}
    //             </ul>
    //           ) : (
    //             <p className="text-lg mb-4">{section.content}</p>
    //           )}
    //         </section>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section
      className="lx-faq bg-white w-full "
      style={{
        backgroundImage: "url('/assets/img/sec-bg.png')",
        backgroundSize: "4500px",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto pages">
        {/* Page Container */}
        <div className="bg-gray-100 rounded-md py-8 px-4 text-black">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black">
              {privacyPolicyData.title.rendered}
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              {/* Effective Date: {new Date(privacyPolicyData.date).toLocaleDateString()} */}
            </p>
          </header>

          {/* Map through content */}
          <section className="bg-white p-8 shadow-md rounded-lg">
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: privacyPolicyData.content.rendered }}
            ></div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
