import React from "react";
import { fetchCardCategoriesContentApi } from "@/server-api/apifunctions/apiService";
import CardPageLayout from "@/components/common/card-page-layout";

const BusinessCard = async ({ data, features }: any) => {
  const CardCategoriesData = await fetchCardCategoriesContentApi();

  const businessCardData = CardCategoriesData && CardCategoriesData?.filter((category: any) => category.parent === 41).find((card: any) =>
    card.name.toLowerCase().includes("business")
  );

  const bannerData = {
    image: data?.acf?.our_products_page_banner_image?.url,
    tagline: data?.acf?.our_products_page_banner_tagline,
    description: data?.acf?.our_products_page_banner_description,
    video: data?.acf?.our_products_page_banner_video?.url,
  };

  const bodyContent = {
    htmlContent: data?.acf?.our_products_cards_body_content,
    buttonText: data?.acf?.our_products_cards_body_button_text,
    priceText: data?.acf?.our_products_cards_body_price_text,
    customizeLink: "/digital-business-credit-card/customize",
  };

  return (
    <CardPageLayout
      bannerData={bannerData}
      cardData={businessCardData}
      bodyContent={bodyContent}
      features={features}
      featureBackground={data?.acf?.metal_nfc_cards_features_bgimage?.url}
      featureTitle={data?.acf?.metal_nfc_cards_features_title}
      featureSubtitle={data?.acf?.metal_nfc_cards_features_subtitle}
    />
  );
};

export default BusinessCard;
