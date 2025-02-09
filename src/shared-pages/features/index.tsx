import React from "react";
import {
  fetchFeaturesApi,
  fetchHomePageTitlesApi,
} from "@/server-api/apifunctions/apiService";
import FeaturesComponent from "./features";

const Features = async () => {
  const titles = await fetchHomePageTitlesApi();
  const featuresData = await fetchFeaturesApi();

  return <FeaturesComponent titles={titles.acf} featuresData={featuresData} />;
};

export default Features;
