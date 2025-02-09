import React from "react";
import Faq from "@/shared-pages/faq";
import { Fragment } from "react";
import { fetchFaqApi } from "@/server-api/apifunctions/apiService";

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

const FAQPage = async () => {
  const data = await fetchFaqApi();

  const parsedData = data.map((item: any) => ({
    question: item.title.rendered,
    description: item.content.rendered,
  }));

  return (
    <Fragment>
      <Faq faqData={parsedData}/>
    </Fragment>
  );
};

export default FAQPage;
