import PrivacyPolicy from '@/shared-pages/privacy-policy'
import React, { Fragment } from 'react'

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

const PrivacyPolicyPage = async () => {
  // const data = await fetchPrivacyPolicyApi();
  // //console.log("fetchPrivacyPolicyApi", data)

  return (
    <Fragment>
        <PrivacyPolicy/>
    </Fragment>
  )
}

export default PrivacyPolicyPage