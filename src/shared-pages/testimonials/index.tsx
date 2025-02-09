import React from "react";
import {
  fetchHomePageTitlesApi,
  fetchTestimonialsApi,
} from "@/server-api/apifunctions/apiService";
import TestimonialsComponent from "./testimonials";

const Testimonials = async () => {
  const titles = await fetchHomePageTitlesApi();
  const testimonialsData = await fetchTestimonialsApi();

  return (
    <TestimonialsComponent
      titles={titles}
      testimonialsData={testimonialsData}
    />
  );
};

export default Testimonials;
