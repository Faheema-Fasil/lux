import { fetchPaymentsAndWhiteLabellingData } from "@/server-api/apifunctions/apiService";
import WhiteLabelling from "@/shared-pages/white-labelling";
import React from "react";
import { Fragment } from "react";

const MetalNfcCardPage = async () => {
  const {contentData, featuresData, cards} = await fetchPaymentsAndWhiteLabellingData()
  console.log('Content data', contentData)

  return (
    <Fragment>
      <WhiteLabelling data={contentData} features={featuresData} cards={cards} />
    </Fragment>
  );
};

export default MetalNfcCardPage;
