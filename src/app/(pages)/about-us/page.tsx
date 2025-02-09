import { fetchAboutUsPageApi } from "@/server-api/apifunctions/apiService";
import Features from "@/shared-pages/features";
import HowItWorksCardImage from "@/shared-pages/home/how-it-works/card-image";
import Testimonials from "@/shared-pages/testimonials";
import Image from "next/image";
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

const AboutUsPage = async () => {
  const data = await fetchAboutUsPageApi();
  const photoUrl = "/how-it-works-front.png";

  return (
    <div>
      <div className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image src={data?.acf?.our_products_page_banner_image?.url} layout="fill" objectFit="cover" alt="Banner" />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
          <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4 capitalize">
            {data?.acf?.our_products_page_banner_tagline}
          </h1>
          <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
            {data?.acf?.our_products_page_banner_description}
          </p>
        </div>
      </div>
      <div
        className="section-padding py-16 w-full bg-cover bg-center bg-[#f7f7f7]"
        style={{
          backgroundImage: `url(${data?.acf?.our_products_cards_body_bgimage?.url})`,
        }}
      >
        <div className="container mx-auto ">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="mb-8">
                {/* <Image
                    src={data?.acf?.our_products_cards_body_image?.url}
                    alt="Our products"
                    className="mx-auto"
                    height={500}
                    width={500}
                  /> */}
                <HowItWorksCardImage photoUrl={photoUrl} link={false} />
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <p
                className="text-gray-600 mt-2"
                dangerouslySetInnerHTML={{
                  __html: data?.acf?.our_products_cards_body_content,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
};

export default AboutUsPage;
