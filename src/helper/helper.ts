import { format } from "date-fns";
import { countryCodes } from "./country";
import { fetchDataApi, uploadImageApi } from "@/server-api/apifunctions/apiService";
import { cssColors } from "./colors";
import html2canvas from "html2canvas";
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

export const captureSwiperImages = async (swiperRef: any, setIsCapturing: any, imageLoaded: any) => {
  const maxContainerWidth = Math.min(window.innerWidth, 800); 
  const maxContainerHeight = Math.min(window.innerHeight, 600); 

  if (!swiperRef?.current?.swiper || !swiperRef.current.swiper.slides.length) {
    console.error("Swiper not initialized or has no slides");
    return;
  }

  const swiper = swiperRef.current.swiper;
  const originalIndex = swiper.activeIndex;

  setIsCapturing(true);
  await new Promise((resolve) => setTimeout(resolve, 100));

  const captureSlide = async (index: number) => {
    swiper.slideTo(index);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!imageLoaded) await new Promise((resolve) => setTimeout(resolve, 500));

    const captureContainer = document.getElementById("captureContainer");
    if (!captureContainer) {
      console.error("Capture container not found.");
      return null;
    }

    const cloneContainer = captureContainer.cloneNode(true) as HTMLElement;
    document.body.appendChild(cloneContainer);

    const swiperNav = cloneContainer.querySelector("#swiperNavigation");
    if (swiperNav) {
      (swiperNav as HTMLElement).style.display = "none";
    }

    cloneContainer.style.position = "absolute";
    cloneContainer.style.top = "-9999px";
    cloneContainer.style.left = "-9999px";
    cloneContainer.style.pointerEvents = "none";
    cloneContainer.style.overflow = "hidden";

    const width = captureContainer.scrollWidth;
    const height = captureContainer.scrollHeight;

    const scaleX = maxContainerWidth / width;
    const scaleY = maxContainerHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);

    cloneContainer.style.transform = `scale(${scale})`;
    cloneContainer.style.transformOrigin = "top left";
    cloneContainer.style.width = `${width}px`;
    cloneContainer.style.height = `${height}px`;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const img = cloneContainer.querySelector(".swiper-slide-active img") as HTMLImageElement;
    if (img && !img.complete) {
      try {
        await new Promise<void>((resolve:any, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      } catch (error) {
        console.error(error);
        document.body.removeChild(cloneContainer);
        return null;
      }
    }

    const capturedCanvas = await html2canvas(cloneContainer, {
      scale: window.devicePixelRatio || 1,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    });

    document.body.removeChild(cloneContainer);

    return capturedCanvas;
  };

  const cropTransparentBackground = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    let top = height, left = width, right = 0, bottom = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3]; 
        if (alpha > 0) { 
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }

    if (right === 0 && bottom === 0) return canvas;

    const croppedWidth = right - left + 1;
    const croppedHeight = bottom - top + 1;
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;
    const croppedCtx = croppedCanvas.getContext("2d");

    if (croppedCtx) {
      croppedCtx.drawImage(canvas, left, top, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);
    }

    return croppedCanvas;
  };

  const frontCanvas = await captureSlide(0);
  const backCanvas = await captureSlide(1);

  swiper.slideTo(originalIndex);

  if (frontCanvas && backCanvas) {
    const croppedFront = cropTransparentBackground(frontCanvas);
    const croppedBack = cropTransparentBackground(backCanvas);

    const mergedCanvas = document.createElement("canvas");
    const context = mergedCanvas.getContext("2d");

    if (!context) return;

    const totalWidth = croppedFront.width + croppedBack.width;
    const maxHeight = Math.max(croppedFront.height, croppedBack.height);

    mergedCanvas.width = totalWidth;
    mergedCanvas.height = maxHeight;

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, mergedCanvas.width, mergedCanvas.height);

    context.drawImage(croppedFront, 0, 0);
    context.drawImage(croppedBack, croppedFront.width, 0);

    setIsCapturing(false);

    return mergedCanvas.toDataURL("image/png");
  }
};


// export const captureSwiperImages = async (swiperRef: any, setIsCapturing: any, imageLoaded: any) => {
//   const scaleFactor = 1.24;

//   if (!swiperRef?.current?.swiper || !swiperRef.current.swiper.slides.length) {
//     console.error("Swiper not initialized or has no slides");
//     return;
//   }

//   const swiper = swiperRef.current.swiper;
//   const originalIndex = swiper.activeIndex;

//   setIsCapturing(true);

//   await new Promise((resolve) => setTimeout(resolve, 100));

//   // const captureSlide = async (index: number) => {
//   //   // Navigate to the target slide.
//   //   swiper.slideTo(index);
//   //   await new Promise((resolve) => setTimeout(resolve, 500));
//   //   if (!imageLoaded) await new Promise((resolve) => setTimeout(resolve, 500));

//   //   // Get the active slide element.
//   //   const slide = document.querySelector(".swiper-slide-active");
//   //   if (!slide) {
//   //     console.error(`Slide ${index} not found.`);
//   //     return null;
//   //   }

//   //   // Get the container element.
//   //   const captureContainer = document.getElementById("captureContainer");
//   //   if (!captureContainer) {
//   //     console.error("Capture container not found.");
//   //     return null;
//   //   }

//   //   // Use scrollWidth/scrollHeight to get the full intrinsic dimensions.
//   //   const width = captureContainer.scrollWidth;
//   //   const height = captureContainer.scrollHeight;

//   //   // Clone the container so that modifications don’t affect the live UI.
//   //   const cloneContainer = captureContainer.cloneNode(true);
//   //   const cloneEl = cloneContainer as HTMLElement;

//   //   // Remove transforms to render the element at its natural size.
//   //   cloneEl.style.transform = "none";
//   //   // Set explicit dimensions based on the full content size.
//   //   cloneEl.style.width = `${width}px`;
//   //   cloneEl.style.height = `${height}px`;
//   //   // Ensure that overflow is visible so nothing is clipped.
//   //   cloneEl.style.overflow = "visible";

//   //   // Optionally, remove navigation from the clone.
//   //   const swiperNav = cloneEl.querySelector("#swiperNavigation");
//   //   if (swiperNav) {
//   //     (swiperNav as HTMLElement).style.display = "none";
//   //   }

//   //   // Instead of positioning far offscreen, place the clone at (0,0) with a low z-index.
//   //   cloneEl.style.position = "absolute";
//   //   cloneEl.style.top = "0";
//   //   cloneEl.style.left = "0";
//   //   cloneEl.style.zIndex = "-1000";
//   //   document.body.appendChild(cloneEl);

//   //   // Wait a short moment to ensure the browser has time to render the clone.
//   //   await new Promise((resolve) => setTimeout(resolve, 100));

//   //   // Ensure that any images in the clone are fully loaded.
//   //   const img = cloneEl.querySelector(".swiper-slide-active img") as HTMLImageElement;
//   //   if (img && !img.complete) {
//   //     try {
//   //       await new Promise<void>((resolve, reject) => {
//   //         img.onload = resolve;
//   //         img.onerror = reject;
//   //       });
//   //     } catch (error) {
//   //       console.error(error);
//   //       document.body.removeChild(cloneEl);
//   //       return null;
//   //     }
//   //   }

//   //   // Use the devicePixelRatio for better fidelity.
//   //   const scale = window.devicePixelRatio || 1;
//   //   const capturedCanvas = await html2canvas(cloneEl, {
//   //     scale: scale,
//   //     backgroundColor: null,
//   //     useCORS: true,
//   //     logging: false,
//   //   });

//   //   // Clean up the offscreen clone.
//   //   document.body.removeChild(cloneEl);

//   //   // Normalize the canvas if needed.
//   //   if (capturedCanvas.width !== width * scale || capturedCanvas.height !== height * scale) {
//   //     const normalizedCanvas = document.createElement("canvas");
//   //     normalizedCanvas.width = width * scale;
//   //     normalizedCanvas.height = height * scale;
//   //     const ctx = normalizedCanvas.getContext("2d");
//   //     if (ctx) {
//   //       ctx.drawImage(
//   //         capturedCanvas,
//   //         0,
//   //         0,
//   //         capturedCanvas.width,
//   //         capturedCanvas.height,
//   //         0,
//   //         0,
//   //         normalizedCanvas.width,
//   //         normalizedCanvas.height
//   //       );
//   //     }
//   //     return normalizedCanvas;
//   //   }

//   //   return capturedCanvas;
//   // };

//   const captureSlide = async (index: number) => {
//     swiper.slideTo(index);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     if (!imageLoaded) await new Promise((resolve) => setTimeout(resolve, 500));

//     const slide = document.querySelector(".swiper-slide-active");
//     if (!slide) {
//       console.error(`Slide ${index} not found.`);
//       return null;
//     }

//     const captureContainer = document.getElementById("captureContainer");
//     if (!captureContainer) {
//       console.error("Capture container not found.");
//       return null;
//     }

//     const width = captureContainer.scrollWidth;
//     const height = captureContainer.scrollHeight;

//     const cloneContainer = captureContainer.cloneNode(true);
//     const cloneEl = cloneContainer as HTMLElement;

//     cloneEl.style.transform = "none";
//     cloneEl.style.width = `${width}px`;
//     cloneEl.style.height = `${height}px`;
//     cloneEl.style.overflow = "visible";

//     const swiperNav = cloneEl.querySelector("#swiperNavigation");
//     if (swiperNav) {
//       (swiperNav as HTMLElement).style.display = "none";
//     }

//     cloneEl.style.position = "absolute";
//     cloneEl.style.top = "-9999px";
//     cloneEl.style.left = "-9999px";
//     cloneEl.style.pointerEvents = "none";
//     document.body.appendChild(cloneEl);

//     await new Promise((resolve) => setTimeout(resolve, 100));

//     const img = cloneEl.querySelector(".swiper-slide-active img") as HTMLImageElement;
//     if (img && !img.complete) {
//       try {
//         await new Promise<void>((resolve: any, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });
//       } catch (error) {
//         console.error(error);
//         document.body.removeChild(cloneEl);
//         return null;
//       }
//     }

//     // Capture the offscreen clone using html2canvas.
//     const scale = window.devicePixelRatio || 1;
//     const capturedCanvas = await html2canvas(cloneEl, {
//       scale: scale,
//       backgroundColor: null,
//       useCORS: true,
//       logging: false,
//     });

//     // Remove the offscreen clone.
//     document.body.removeChild(cloneEl);

//     // Normalize canvas dimensions if needed.
//     if (capturedCanvas.width !== width * scale || capturedCanvas.height !== height * scale) {
//       const normalizedCanvas = document.createElement("canvas");
//       normalizedCanvas.width = width * scale;
//       normalizedCanvas.height = height * scale;
//       const ctx = normalizedCanvas.getContext("2d");
//       if (ctx) {
//         ctx.drawImage(
//           capturedCanvas,
//           0,
//           0,
//           capturedCanvas.width,
//           capturedCanvas.height,
//           0,
//           0,
//           normalizedCanvas.width,
//           normalizedCanvas.height
//         );
//       }
//       return normalizedCanvas;
//     }

//     return capturedCanvas;
//   };

//   const frontCanvas = await captureSlide(0);
//   const backCanvas = await captureSlide(1);

//   swiper.slideTo(originalIndex);

//   if (frontCanvas && backCanvas) {
//     const mergedCanvas = document.createElement("canvas");
//     const context = mergedCanvas.getContext("2d");

//     if (!context) return;

//     const totalWidth = frontCanvas.width + backCanvas.width;
//     const maxHeight = Math.max(frontCanvas.height, backCanvas.height);

//     mergedCanvas.width = totalWidth * scaleFactor;
//     mergedCanvas.height = maxHeight * scaleFactor;

//     context.drawImage(
//       frontCanvas,
//       0,
//       0,
//       frontCanvas.width,
//       frontCanvas.height,
//       0,
//       0,
//       frontCanvas.width * scaleFactor,
//       frontCanvas.height * scaleFactor
//     );

//     context.drawImage(
//       backCanvas,
//       0,
//       0,
//       backCanvas.width,
//       backCanvas.height,
//       frontCanvas.width * scaleFactor,
//       0,
//       backCanvas.width * scaleFactor,
//       backCanvas.height * scaleFactor
//     );

//     setIsCapturing(false);

//     const mergedImage = mergedCanvas.toDataURL("image/png");
//     return mergedImage;
//   }
// };

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
    return response;
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

      console.log("galleryImageIds", galleryImageIds);

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
