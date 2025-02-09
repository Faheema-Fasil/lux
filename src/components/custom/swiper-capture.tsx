// import { useRef } from "react";
// import html2canvas from "html2canvas";

// const useSwiperCapture = () => {
//     const swiperRef = useRef(null);

//     const handleCapture = () => {
//         const swiper = swiperRef?.current?.swiper;
//         const slides = swiper?.slides;
//         if (slides && slides.length > 0) {
//             const captureContainer = document.createElement("div");
//             captureContainer.style.display = "flex";

//             slides.forEach((slide) => {
//                 const clonedSlide = slide.cloneNode(true);
//                 captureContainer.appendChild(clonedSlide);
//             });

//             document.body.appendChild(captureContainer);

//             html2canvas(captureContainer).then((canvas) => {
//                 // const imgData = canvas.toDataURL("image/png");
//                 // //console.log(imgData);
//             });
//         }
//     };

//     return { swiperRef, handleCapture };
// };

// export default useSwiperCapture;
