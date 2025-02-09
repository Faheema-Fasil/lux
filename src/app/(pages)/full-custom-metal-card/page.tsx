import React from "react";
import { fetchCardCategoriesContentApi, fetchCustomPageApi } from "@/server-api/apifunctions/apiService";
import CardPageLayout from "@/components/common/card-page-layout";

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

const CustomCardPage = async () => {
  const customData = await fetchCustomPageApi();
  const CardCategoriesData = await fetchCardCategoriesContentApi();

  const customCardData = CardCategoriesData && CardCategoriesData?.filter((category: any) => category.parent === 41).find((card: any) =>
    card.name.toLowerCase().includes("custom")
  );

  const bannerData = {
    image: customData.homeData.acf.our_products_page_banner_image?.url,
    tagline: customData.homeData.acf.our_products_page_banner_tagline,
    description: customData.homeData.acf.our_products_page_banner_description,
    video: customData.homeData.acf.our_products_page_banner_video?.url,
  };

  const bodyContent = {
    htmlContent: customData.homeData.acf.our_products_cards_body_content || "",
    buttonText: customData.homeData.acf.our_products_cards_body_button_text || "Customize",
    priceText: customData.homeData.acf.our_products_cards_body_price_text || "",
    customizeLink: "/full-custom-metal-card/customize",
  };

  return (
    <CardPageLayout
      bannerData={bannerData}
      cardData={customCardData}
      bodyContent={bodyContent}
      features={customData.featuresData}
      featureBackground="https://tomsher.co/LUX/wp-content/uploads/2024/12/bg-b.jpg"
      featureTitle={customData.homeData.acf.metal_nfc_cards_features_title || "Custom Card Features"}
      featureSubtitle={
        customData.homeData.acf.metal_nfc_cards_features_subtitle ||
        "Make a Bold Statement with Luxmetallic's Custom Metal Cards"
      }
    />
  );
};

export default CustomCardPage;

