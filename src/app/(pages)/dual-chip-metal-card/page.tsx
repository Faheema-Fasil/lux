import React from "react";
import { fetchCardCategoriesContentApi, fetchDualChipCardData } from "@/server-api/apifunctions/apiService";
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

const DualChipCardPage = async () => {
  const { contentData, featuresData } = await fetchDualChipCardData();
  const CardCategoriesData = await fetchCardCategoriesContentApi();

  const dualChipCardData = CardCategoriesData && CardCategoriesData?.filter((category: any) => category?.parent === 41)?.find((card: any) =>
    card?.name?.toLowerCase().includes("dual chip")
  );

  const bannerData = {
    image: contentData?.acf?.our_products_page_banner_image?.url,
    tagline: contentData?.acf?.our_products_page_banner_tagline,
    description: contentData?.acf?.our_products_page_banner_description,
    video: contentData?.acf?.our_products_page_banner_video?.url,
  };

  const bodyContent = {
    htmlContent: contentData?.acf?.our_products_cards_body_content || "",
    buttonText: contentData?.acf?.our_products_cards_body_button_text || "Customize",
    priceText: contentData?.acf?.our_products_cards_body_price_text || "",
    customizeLink: "/dual-chip-metal-card/customize",
  };

  return (
    <CardPageLayout
      bannerData={bannerData}
      cardData={dualChipCardData}
      bodyContent={bodyContent}
      features={featuresData}
      featureBackground="https://tomsher.co/LUX/wp-content/uploads/2024/12/bg-b.jpg"
      featureTitle={contentData?.acf?.metal_nfc_cards_features_title || "Dual Chip Features"}
      featureSubtitle={
        contentData?.acf?.metal_nfc_cards_features_subtitle ||
        "Make a Bold Statement with Luxmetallic's Dual Chip Cards"
      }
    />
  );
};

export default DualChipCardPage;
