import { format } from "date-fns";
import { countryCodes } from "./country";
import {  fetchDataApi, uploadImageApi } from "@/server-api/apifunctions/apiService";
import { cssColors } from "./colors";
import { toCanvas } from "html-to-image";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import axios from "axios";

// export const formatPrice = (price: string | number) => {
//   if (price !== null && price !== undefined && !isNaN(Number(price))) {
//     return (Number(price) / 100)
//       .toFixed(2)
//       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
//   return "N/A";
// };

export const formatPrice = (price: string | number) => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
  }).format(Number(price) / 100);
};

export function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}

export const getFormattedDateTime = (dateString: string, dateFormat?: string): string => {
  const dateFormatStr = dateFormat || "MMM dd, yyyy";
  if (dateString) {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Format the date to dateFormatStr
    return format(date, dateFormatStr);
  } else {
    return "";
  }
};

export const fetchProductImages = async ({
  items,
  fetchDataClientApi,
  apiEndpointGenerator,
  defaultImageUrl = "/assets/img/detail-page/card-f.png",
}: {
  items: any;
  fetchDataClientApi: any;
  apiEndpointGenerator: any;
  defaultImageUrl?: string;
}) => {
  const productsWithImages = await Promise.all(
    items.map(async (item: any) => {
      const apiEndpoint = apiEndpointGenerator(Number(item.id));
      const retVal = await fetchDataClientApi({ apiEndpoint });
      const imageUrl = retVal?.images[0]?.src || defaultImageUrl;
      return { item, imageUrl };
    })
  );
  return productsWithImages;
};

export const getCustomImage = (item: any): string | null => {
  const wcpaData = item.cart_item_data?.wcpa_data;

  if (wcpaData) {
    for (const secKey in wcpaData) {
      const section = wcpaData[secKey];

      if (section.fields) {
        for (const fieldGroupKey in section.fields) {
          const fieldGroup = section.fields[fieldGroupKey];

          const customizedProductField = fieldGroup.find((field: any) => field.label === "customized product");

          if (customizedProductField) {
            const value = customizedProductField.value;
            if (typeof value === "string" && value.startsWith("http")) {
              return value;
            }
          }
        }
      }
    }
  }

  return null; // Ensure null is returned if no valid string is found
};

export const extractPhoneDetails = (billingPhone: string) => {
  const normalizedPhone = billingPhone.startsWith("+") ? billingPhone : `+${billingPhone}`;

  const matchingCountry = countryCodes.find(({ code }) => normalizedPhone.startsWith(code));

  if (matchingCountry) {
    const countryCode = matchingCountry.code;
    const number = normalizedPhone.slice(countryCode.length);
    return { countryCode, number };
  }

  return { countryCode: "", number: billingPhone };
};

// export const extractPhoneDetails = (billingPhone: any) => {
//   const matchingCountry = countryCodes.find(({ code }) =>
//     billingPhone.startsWith(code.replace("+", ""))
//   );

//   if (matchingCountry) {
//     const countryCode = matchingCountry.code;
//     const number = billingPhone.slice(countryCode.replace("+", "").length);
//     return { countryCode, number };
//   }

//   // Fallback if no match is found
//   return { countryCode: "", number: billingPhone };
// };

export const uploadImage = async (imgData: string, fileName: string, size?: number) => {
  try {
    return await uploadImageApi(imgData, fileName, size);
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};

import html2canvas from "html2canvas";

export const captureSwiperImages = async (
  swiper: any,
  slides: any,
  swiperSize: any
) => {
  const captureContainer = document.createElement("div");
  captureContainer.style.display = "flex";
  captureContainer.style.position = "absolute";
  captureContainer.style.top = "-9999px";
  captureContainer.style.left = "-9999px";
  captureContainer.style.width = `${
    Number(swiperSize.width) * slides.length
  }px`;
  captureContainer.style.height = `${swiperSize.height}px`;

  slides.forEach((slide: any) => {
    const clonedSlide = slide.cloneNode(true);
    clonedSlide.style.width = `${swiperSize.width}px`;
    clonedSlide.style.height = `${swiperSize.height}px`;
    captureContainer.appendChild(clonedSlide);
  });

  document.body.appendChild(captureContainer);

  const canvas = await html2canvas(captureContainer, {
    scale: window.devicePixelRatio || 1,
    useCORS: true,
    width: captureContainer.scrollWidth,
    height: captureContainer.scrollHeight,
  });
  const imgData = canvas.toDataURL("image/png");

  document.body.removeChild(captureContainer);

  return imgData;
};

// export const captureSwiperImages = async (
//   swiper: any,
//   slides: any,
//   swiperSize: any
// ) => {
//   const captureContainer = document.createElement("div");
//   captureContainer.style.display = "flex";
//   captureContainer.style.position = "absolute";
//   captureContainer.style.top = "-9999px";
//   captureContainer.style.left = "-9999px";
//   captureContainer.style.width = `${
//     Number(swiperSize.width) * slides.length
//   }px`;
//   captureContainer.style.height = `${swiperSize.height}px`;

//   slides.forEach((slide: any) => {
//     const clonedSlide = slide.cloneNode(true);
//     clonedSlide.style.width = `${swiperSize.width}px`;
//     clonedSlide.style.height = `${swiperSize.height}px`;
//     captureContainer.appendChild(clonedSlide);
//   });

//   document.body.appendChild(captureContainer);

//   const canvas = await html2canvas(captureContainer, {
//     scale: window.devicePixelRatio || 1,
//     useCORS: true,
//     width: captureContainer.scrollWidth,
//     height: captureContainer.scrollHeight,
//   });
//   const imgData = canvas.toDataURL("image/png");

//   document.body.removeChild(captureContainer);

//   return imgData;
// };

export const urlFormatted = (url: string) => {
  const isUrl = url?.startsWith("http") ? url : "#";
  const lastSegment = isUrl.split("/").filter(Boolean).pop() || "";
  return lastSegment;
};

export const phoneFormatted = (phone: string) => {
  const formattedPhone = phone.replace(/[^\d]/g, "");
  return formattedPhone;
};

export const getEmbedUrl = (
  url: string,
  options = {
    autoplay: true,
    mute: true,
    controls: false,
    modestbranding: true,
  }
) => {
  const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const queryParams = new URLSearchParams();

    if (options.autoplay) queryParams.append("autoplay", "1");
    if (options.mute) queryParams.append("mute", "1");
    if (!options.controls) queryParams.append("controls", "0");
    if (options.modestbranding) queryParams.append("modestbranding", "1");
    queryParams.append("rel", "0");
    queryParams.append("iv_load_policy", "3");

    return `${baseUrl}?${queryParams.toString()}`;
  }

  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    const queryParams = new URLSearchParams();

    if (options.autoplay) queryParams.append("autoplay", "1");
    if (options.mute) queryParams.append("muted", "1");
    queryParams.append("background", "1");

    return `https://player.vimeo.com/video/${videoId}?${queryParams.toString()}`;
  }

  return url;
};

export const isMediaType = (url: any) => {
  if (!url) return null;

  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "wmv", "flv", "mkv"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

  const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  if (!extensionMatch) return null;

  const extension = extensionMatch[1].toLowerCase();

  if (videoExtensions.includes(extension)) return "video";
  if (imageExtensions.includes(extension)) return "image";

  return null; // Not a recognized video or image type
};

export const getValues = (values: string) => {
  values
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .split(",")
    .map((value: any) => value.trim().toLowerCase());
};

export function extractVimeoId(url: any) {
  const regex = /(?:https?:\/\/(?:www\.)?(?:vimeo\.com\/(?:.*\/)?(\d+)|player\.vimeo\.com\/video\/(\d+)))/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}

export function getMatchingCssColor(input: string): string {
  const normalizedInput = input.toLowerCase().trim();

  // Check for exact match
  if (cssColors.includes(normalizedInput)) {
    return normalizedInput;
  }

  // Find the most similar color name
  const getSimilarity = (a: string, b: string): number => {
    let matches = 0;
    const length = Math.min(a.length, b.length);
    for (let i = 0; i < length; i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
  };

  let bestMatch = "";
  let bestScore = 0;

  cssColors.forEach((color) => {
    const score = getSimilarity(normalizedInput, color);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = color;
    }
  });

  return bestMatch || "No matching color found.";
}

export function formatDate(dateString: any) {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
}

export const fetchProductById = async (productId: number) => {
  try {
    const response = await fetchDataApi(productId);
    return response
  } catch (err) {
    console.error(`Error fetching product ${productId}:`, err);
    return null; // Handle error gracefully
  }
};

export const fetchAllVariationData = async (variationIds: number[]) => {
  try {
    const variationPromises = variationIds.map(async (variationId) => {
      const variationDetails = await fetchProductById(variationId);

      // Extract gallery image IDs
      const galleryImageIds = variationDetails?.meta_data.find(
        (meta: { key: string; value: string[] }) => meta.key === "woo_variation_gallery_images"
      )?.value;

    console.log("galleryImageIds",galleryImageIds)


      let galleryImages: any = [];
      if (Array.isArray(galleryImageIds)) {
        galleryImages = await Promise.all(
          galleryImageIds.map(async (imageId: string) => {
            try {
              const apiEndpoint = apiEndpoints.products.productImage(imageId);
              const response = await axios.get(apiEndpoint);

              return {
                id: imageId,
                url: response?.data?.source_url || "/path/to/fallback-image.jpg",
                width: response?.data?.media_details?.width || 100,
                height: response?.data?.media_details?.height || 100,
              };
            } catch (imageError) {
              console.error(`Failed to fetch image ${imageId}:`, imageError);
              return { id: imageId, url: "/path/to/fallback-image.jpg", width: 100, height: 100 };
            }
          })
        );
      }

      return { ...variationDetails, galleryImages };
    });

    return await Promise.all(variationPromises);
  } catch (err) {
    console.error("Error fetching variation data:", err);
    return [];
  }
};
