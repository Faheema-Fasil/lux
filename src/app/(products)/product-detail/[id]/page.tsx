import React, { Fragment } from "react";
import ProductDetail from "@/shared-pages/products/product-detail";
import { fetchProductDetails, fetchProductImageApi } from "@/server-api/apifunctions/apiService";
import { ProductProps } from "@/types/products/types";

export default async function ProductDetailPage({ params }: { params: any }) {
  const { id } = await params;
  let product: ProductProps | any = null;
  let variations = [];
  let formLabels = [];

  try {
    const productResponse = await fetchProductDetails(Number(id));
    product = productResponse;

    const formSection = Object.keys(product?.wcpa_form_fields?.wcpaData?.fields || {}).find((key) =>
      key.startsWith("sec")
    );
    formLabels = formSection ? product?.wcpa_form_fields?.wcpaData?.fields[formSection]?.fields || [] : [];

    if (product?.variations?.length > 0) {
      const variationPromises = product.variations.map(async (variationId: string) => {
        const variationDetails = await fetchProductDetails(Number(variationId));

        //   const galleryImages = variationDetails.images.map((image: { id: number; src: string; }) => ({
        //     id: image.id,
        //     url: image.src,
        //     width: 0,
        //     height: 0,
        //   }));

        //   const thumbnailImages = variationDetails.meta_data.find((field) => field.key.includes("woo_variation_gallery_images")).value.map((value) => (

        //   ));

        //   variationDetails.galleryImages = galleryImages;
        //   return variationDetails;
        // });

        const metaDataField = variationDetails.meta_data.find((field: any) =>
          field.key.includes("woo_variation_gallery_images")
        );
        const thumbnailImagesPromises = metaDataField
          ? metaDataField.value.map(async (value: any) => {
              const response = await fetchProductImageApi(value);
              const image = await response;
              return image.source_url;
            })
          : [];

        const galleryImages = variationDetails.images.map((image: { id: number; src: string }) => ({
          id: image.id,
          url: image.src,
          width: 0,
          height: 0,
        }));

        const thumbnailImages = await Promise.all(thumbnailImagesPromises);

        variationDetails.thumbnail = thumbnailImages;
        variationDetails.galleryImages = galleryImages;
        return variationDetails;
      });

      variations = await Promise.all(variationPromises);
    }
  } catch (err: any) {
    console.error("Failed to load product details.");
  }

  return (
    <Fragment>
      <ProductDetail formLabels={formLabels} allVariations={variations} product={product} />
    </Fragment>
  );
}


// import React, { Fragment } from "react";
// import ProductDetail from "@/shared-pages/products/product-detail";
// import { apiEndpoints } from "@/server-api/config/api.endpoints";
// import {
//   fetchProductDetails,
//   fetchProductImage,
// } from "@/server-api/apifunctions/apiService";
// import { toast } from "react-toastify";
// import { ProductProps } from "@/types/products/types";

// export default async function ProductDetailPage({params} : {params: any}) {
//   const { id } = await params;
//   let product: ProductProps | any = null;
//   let variations = [];
//   let formLabels = [];

//   try {
//     const productResponse = await fetchProductDetails(Number(id));
//     product = productResponse;
//     console.log("product",product);

//     const formSection = Object.keys(product?.wcpa_form_fields?.wcpaData?.fields || {}).find(
//       (key) => key.startsWith("sec")
//     );
//     formLabels = formSection
//       ? product?.wcpa_form_fields?.wcpaData?.fields[formSection]?.fields || []
//       : [];

//       console.log("formLabels",formLabels)

//     if (product?.variations?.length > 0) {
//       const variationPromises = product.variations.map(async (variationId: string) => {
//         const variationDetails = await fetchProductDetails(Number(variationId));

//         console.log("variationDetails",variationDetails)

//         let galleryImages: unknown = [];
//         const galleryImageIds = variationDetails.meta_data.find(
//           (meta: { key: string; value: string[] }) => meta.key === "woo_variation_gallery_images"
//         )?.value;

//         if (Array.isArray(galleryImageIds)) {
//           galleryImages = await Promise.all(
//             galleryImageIds.map(async (imageId) => {
//               // const imageApi = apiEndpoints.products.productImage(imageId);
//               const imageResponse = await fetchProductImage(Number(imageId));
//               console.log("imageResponse",imageResponse)
//               return {
//                 id: imageId,
//                 url: imageResponse.source_url,
//                 width: imageResponse.media_details.width,
//                 height: imageResponse.media_details.height,
//               };
//             })
//           );
//         }

//         variationDetails.galleryImages = galleryImages;
//         return variationDetails;
//       });

//       variations = await Promise.all(variationPromises);
//       console.log("variations",variations)
//     }
//   } catch (err) {
//     // console.error("Error fetching product or variation data:", err);
//     console.error("Failed to load product details.");
//   }

//   return (
//     <Fragment>
//         {product && variations && formLabels && (
//             <ProductDetail
//             formLabels={formLabels}
//             allVariations={variations}
//             product={product}
//             />
//         )}
//     </Fragment>
//   );
// }

