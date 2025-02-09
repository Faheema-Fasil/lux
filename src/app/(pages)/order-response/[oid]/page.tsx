"use client";
import {
  fetchOrderDetails,
  updateOrderStatus,
  updatePaymentStatusApi,
  updateWcOrderStatus,
} from "@/server-api/apifunctions/apiService";
import { getFormattedDateTime } from "@/helper/helper";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { telrOrderResponseStatus, updateOrderStatusType } from "@/helper/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearCart, fetchCartData } from "@/redux/store/cart";
import { setCartKey } from "@/storage";
import Image from "next/image";

interface LineItem {
  id: string;
  image: { src: string };
  name: string;
  meta_data: { display_value: string; key: string }[];
  quantity: number;
}

interface OrderDetails {
  id: string;
  date_created: string;
  total: string;
  currency: string;
  shipping: { address_1: string };
  line_items: LineItem[];
}

const OrderSuccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { oid } = useParams(); // Retrieve the dynamic segment "oid"
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  // useEffect(() => {
  //   if (!tran_ref || !status) return;

  //   const updateOrderStatus = async () => {
  //     try {
  //       // Update WooCommerce order status
  //       await updatePaymentStatusApi(Number(tran_ref), {
  //         tran_ref,
  //         status: status === "success" ? "paid" : "failed",
  //       });

  //       setMessage(
  //         status === "success"
  //           ? "Your payment was successful! Thank you for your order."
  //           : "Payment failed. Please try again."
  //       );
  //     } catch (error) {
  //       console.error("Error updating payment status:", error);
  //       setMessage("An error occurred while updating payment status.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   updateOrderStatus();
  // }, [tran_ref, status]);

  useEffect(() => {
    const orderRef = searchParams.get("OrderRef");
    const urlstatus = searchParams.get("STATUS");
    const updateOrder = async () => {};
    const fetchDetails = async () => {
      try {
        if (oid && orderRef) {
          const orderDetails = await fetchOrderDetails(Number(oid));
          const response = await updateWcOrderStatus(Number(oid), orderRef);
          setOrderDetails(orderDetails);
          if (
            response.data === updateOrderStatusType.success &&
            Number(urlstatus) === telrOrderResponseStatus.success
          ) {
            setStatus("success");
          }
          setIsLoading(false);
        }
        // //console.log(response);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setMessage("An error occurred while fetching order details.");
        setIsLoading(false);
      }
    };
    updateOrder();
    fetchDetails();
  }, []);

  useEffect(() => {
    if (items.length > 0 && status === "success") {
      if (isAuthenticated) {
        dispatch(clearCart());
      } else {
        setCartKey(null);
        dispatch(fetchCartData());
      }
    }
  }, [status]);

  // const OrderSuccessPage = () => {
  //   const router = useRouter();
  //   const [isLoading, setIsLoading] = useState<boolean>(true);
  //   const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  //   const { tran_ref, status } = router.query

  //   const params = useParams();
  //   const searchParams = useSearchParams()

  //   const oid = params.oid

  //   const orderStatus = searchParams.get('status')
  //   // const guest = searchParams.get('guest')

  //   useEffect(() => {
  //     const fetchDetails = async () => {
  //       const response = await fetchOrderDetails(Number(oid))
  //       // //console.log(response);
  //       setOrderDetails(response);
  //       setIsLoading(false)
  //     }
  //     fetchDetails();
  //   }, [])

  // const OrderDetails = await fetchOrderDetails()
  // //console.log("OrderDetails", orderDetails)

  if (!orderDetails && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Not Found</h1>
        <p className="text-lg text-gray-600">
          We couldn't find the order you were looking for. Please make sure you have the correct order ID.
        </p>
      </div>
    );
  }

  const renderOrderItems = () => {
    if (orderDetails && orderDetails.line_items && orderDetails.line_items.length) {
      return orderDetails.line_items.map((eachItem: LineItem) => {
        const customImage = eachItem?.meta_data.find(
          (field) => field.key === "custom_customized-product"
        )?.display_value;
        return (
          <div className="flex items-center mb-4" key={eachItem.id}>
            {customImage ? (
              <div className="grid mr-2">
                <div
                  className="absolute"
                  style={{
                    width: "140px",
                    height: "105px",
                    // overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={customImage}
                    alt={eachItem.name}
                    layout="fill"
                    // height={250}
                    // width={350}
                    objectFit="cover"
                    style={{
                      objectPosition: "left center",
                    }}
                  />
                </div>
              </div>
            ) : (
              // <div className="w-[140px] flex-shrink-0 mr-2 flex justify-center items-center">
              //   <Image src={eachItem?.image?.src} width={180} height={50} alt="" />
              // </div>
              <div className="h-36 w-36 relative group">
                <Image
                  src={eachItem?.image?.src}
                  alt="Product image"
                  width={150}
                  height={150}
                  className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
                  loading="lazy"
                />
              </div>
            )}
            <div className="ml-4">
              <div className="flex flex-col w-full overflow-hidden">
                <a className="mukta-regular text-sm font-medium text-gray-700 text-heading " href="">
                  {eachItem.name}
                </a>
                <span className="text-xs text-gray-400 mb-1">Variation: {eachItem.meta_data[0].display_value}</span>
                <span className="text-xs text-gray-400 mb-1">Quantity : {eachItem.quantity}</span>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="py-60 text-center">
        <button
          disabled
          type="button"
          className="text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 border-y border-x border-slate-950 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#000"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <section className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-full mb-28 mx-auto mt-5 ">
      <div className="bg-white rounded-lg shadow-lg p-3 lg:p-6 max-w-md mx-auto ">
        <div className="text-center">
          {status === "success" ? (
            <svg
              className="w-[100px] mx-auto mb-5"
              version="1.1"
              id="fi_190411"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 507.2 507.2"
              xmlSpace="preserve"
            >
              <circle style={{ fill: "#32BA7C" }} cx="253.6" cy="253.6" r="253.6"></circle>
              <path
                style={{ fill: "#0AA06E" }}
                d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
              ></path>
              <g>
                <path
                  style={{ fill: "#FFFFFF" }}
                  d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                        c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
                ></path>
                <path
                  style={{ fill: "#FFFFFF" }}
                  d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                        c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              className="w-[100px] mx-auto mb-5"
              version="1.1"
              id="fi_190406"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 507.2 507.2"
              xmlSpace="preserve"
            >
              <circle style={{ fill: "#F15249" }} cx="253.6" cy="253.6" r="253.6"></circle>
              <path
                style={{ fill: "#AD0E0E" }}
                d="M147.2,368L284,504.8c115.2-13.6,206.4-104,220.8-219.2L367.2,148L147.2,368z"
              ></path>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M373.6,309.6c11.2,11.2,11.2,30.4,0,41.6l-22.4,22.4c-11.2,11.2-30.4,11.2-41.6,0l-176-176
                    c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L373.6,309.6z"
              ></path>
              <path
                style={{ fill: "#D6D6D6" }}
                d="M280.8,216L216,280.8l93.6,92.8c11.2,11.2,30.4,11.2,41.6,0l23.2-23.2c11.2-11.2,11.2-30.4,0-41.6
                    L280.8,216z"
              ></path>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M309.6,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6L197.6,373.6
                    c-11.2,11.2-30.4,11.2-41.6,0l-22.4-22.4c-11.2-11.2-11.2-30.4,0-41.6L309.6,133.6z"
              ></path>
            </svg>
          )}

          <h2 className="text-2xl font-bold mb-2">
            {status === "success" ? "Order Successfully Completed!" : "Order Failed"}
          </h2>
          <p className="text-gray-600 mb-4">
            {status === "success"
              ? "Thank you for your purchase. Your order details are below."
              : "We are sorry for the inconvenience."}
          </p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="mb-2">
            <span className="font-semibold">Order ID: </span>
            <span>{orderDetails && orderDetails.id}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Order Date: </span>
            <span>{orderDetails && getFormattedDateTime(orderDetails.date_created)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total Amount: </span>
            <span>
              {orderDetails && orderDetails.currency} {orderDetails && orderDetails.total}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Shipping Address: </span>
            <span>{orderDetails && orderDetails.shipping.address_1}</span>
          </div>

          <hr />
          <h3 className="text-lg font-semibold mb-3 mt-3">Order Details</h3>
          <div>{renderOrderItems()}</div>
        </div>

        <div className="text-center mt-6">
          <div className="flex gap-2">
            <Link
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] "
              href={status === "success" && isAuthenticated ? `/orders` : "/"}
            >
              {status === "success" && isAuthenticated ? "Track Order" : "Go to Home"}
            </Link>

            <a
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f]  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]"
              href="/gallery"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
