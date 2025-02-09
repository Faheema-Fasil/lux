import { fetchAllVariationData, fetchProductById } from "@/helper/helper";
import CustomCardCustomizationPage from "@/shared-pages/custom";
import React from "react";

const Page = async () => {
  const productId = Number(71);

  const product = await fetchProductById(productId);

  console.log("productssss",product)
  
  const variationIds = product?.variations ?? [];
  console.log("variationIds",variationIds)
  
  const variations = variationIds.length > 0 ? await fetchAllVariationData(variationIds) : [];
  console.log("variations",variations)


  return (
    <React.Fragment>
      <CustomCardCustomizationPage product={product} variations={variations} />
    </React.Fragment>
  );
};

export default Page;

