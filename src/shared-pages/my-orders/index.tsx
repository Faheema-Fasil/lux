"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSkeleton from "@/components/common/skeleton-loader";
import { toast } from "react-toastify";
import { CancelOrderApi, getCustomerOrders, fetchOrderDetails } from "@/server-api/apifunctions/apiService";
import { useRouter } from "next/navigation";


const MyOrders = () => {
  const [cancelOrderId, setCancelOrderId] = useState<any>();
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);
  const [status, setStatus] = useState<"cancelling" | "cancelled">();
  const [loading, setLoading] = useState<boolean>(true);
  const [myLineItems, setMyLineItems] = useState<any[]>([]);

  const { email } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  //console.log("orders: ", orders);

  const handleCancelOrder = async (orderId: number) => {
    if (cancelOrderId) {
      try {
        setStatus("cancelling");
        setCancellingOrderId(orderId);
        const response = await CancelOrderApi(orderId);
        if (response.status) {
          setStatus("cancelled");
          toast.success("Order cancelled successfully");
          setShowCancelConfirmation(false);
          // setMyLineItems(
          //   myLineItems.filter((item) => item.orderId !== orderId)
          // );
        } else {
          throw response;
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to cancel order");
        setStatus("cancelled");
      }
    }
  };

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const orders = await getCustomerOrders();
  //       if (orders && orders.length) {
  //         const myOrders = await Promise.all(
  //           orders.map(async (order: any) => {
  //             const response = await fetchOrderDetails(order.order_id);
  //             if (response && response.data.success && response.data.order) {
  //               return response.data.order;
  //             } else {
  //               throw response;
  //             }
  //           })
  //         );

  //         const lineItems = myOrders.flatMap((order: any) =>
  //           order.line_items.map((item: any) => ({
  //             ...item,
  //             orderId: order.id,
  //             orderTotal: order.total,
  //             orderStatus: order.status,
  //           }))
  //         );

  //         setMyLineItems(lineItems);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await getCustomerOrders();

        if (orders?.length > 0) {
          const detailedOrders = await Promise.all(
            orders.map(async (order: any) => {
              try {
                const response = await fetchOrderDetails(order.order_id);
                if (response) return response;
              } catch (error) {
                console.error(`Error fetching details for order ${order.order_id}:`, error);
                return null;
              }
            })
          );

          const validOrders = detailedOrders.filter(Boolean);
          const lineItems = validOrders.flatMap((order: any) =>
            order.line_items.map((item: any) => ({
              ...item,
              orderId: order.id,
              orderTotal: order.total,
              orderStatus: order.status,
              image: item.image || { src: "" },
            }))
          );

          setMyLineItems(lineItems);
        }
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // useEffect(() => {
  //   if (orders && orders.length) {
  //     const myOrders = orders.filter((order) => order.billing.email === email);

  //     const lineItems = myOrders.flatMap((order) =>
  //       order.line_items.map((item: any) => ({
  //         ...item,
  //         orderId: order.id,
  //         orderTotal: order.total,
  //         orderStatus: order.status,
  //       }))
  //     );

  //     setMyLineItems(lineItems);
  //   }
  // }, [orders]);

  if (!isAuthenticated) {
    router.push("/login");
  }

  return (
    <section className="services bg-white py-16 w-full px-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="lx-card-listing-section">
          <div className="border-b-2 mb-[20px] py-3 flex flex-col">
            <h1 className="text-black text-2xl">My Orders</h1>
          </div>

          <div className="flex flex-col gap-10">
            {/* Group orders by orderId */}
            {myLineItems.length > 0 ? (
              Object.entries(
                myLineItems.reduce((acc, item) => {
                  acc[item.orderId] = acc[item.orderId] || [];
                  acc[item.orderId].push(item);
                  return acc;
                }, {})
              ).map(([orderId, items]: any) => (
                <div key={orderId} className="border rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-md md:text-xl font-medium text-black">Order ID: {orderId}</h2>
                    <div className="text-sm text-gray-600">
                      {/* <p>
                        Date:{" "}
                        {new Date(items[0].date_created).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p> */}
                      <p className="text-primary font-bold">
                        Total: AED {items[0].currency_symbol}
                        {items[0].orderTotal}
                      </p>
                    </div>
                  </div>

                  {items[0].orderStatus === "pending" && (
                    <button
                      onClick={() => {
                        setCancelOrderId(orderId);
                        handleCancelOrder(orderId);
                        setShowCancelConfirmation(true);
                      }}
                      className="flex items-center rounded-full justify-center mb-3 px-4 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
                    >
                      {orderId === cancellingOrderId && status === "cancelling" ? (
                        <div className="relative">
                          <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs"></span>
                        </div>
                      ) : (
                        "Cancel Order"
                      )}
                    </button>
                  )}

                  <div className="flex flex-col gap-4">
                    {items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex border rounded-xl gap-4 overflow-hidden group flex-col md:flex-row xl:flex-row items-center justify-center"
                      >
                        <div className="overflow-hidden w-[250px] h-[135px] mt-4 md:mt-2 md:mb-2 bg-white flex justify-center my-auto">
                          {item.meta_data.find((field: any) => field.display_key === "custom_customized-product")
                            ?.display_value ? (
                            <div className="grid m-3">
                              <div
                                className="absolute"
                                style={{
                                  width: "190px",
                                  height: "142px",
                                  // overflow: "hidden",
                                  position: "relative",
                                }}
                              >
                                <Image
                                  src={
                                    item.meta_data.find(
                                      (field: any) => field.display_key === "custom_customized-product"
                                    )?.display_value
                                  }
                                  alt="Custom Product"
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
                            <Image src={item.image.src} alt={item.name} height={150} width={180} style={{ objectFit: "contain" }} />
                          )}
                        </div>

                        <div className="flex items-center lg:items-start w-full gap-3 p-4 flex-col xl:flex-row justify-center xl:justify-start">
                          <div className="flex flex-col wrap px-3">
                            <h2 className="text-xl font-medium text-black m-0">{item.name}</h2>
                            <ul className="!list-disc ps-4 text-base text-gray-600 mt-3">
                              <li>
                                Variation:{" "}
                                {item.meta_data.find((meta: any) => meta.key === "pa_metal-finish")?.display_value ||
                                  "N/A"}
                              </li>
                              <li>
                                Status:{" "}
                                <span
                                  className={`${
                                    item.orderStatus === "processing"
                                      ? "text-green-500"
                                      : item.orderStatus === "completed"
                                      ? "text-blue-500"
                                      : item.orderStatus === "trash"
                                      ? "text-red-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {item.orderStatus === "trash" ? "cancelled" : item.orderStatus}
                                </span>
                              </li>
                              <li>Quantity: {item.quantity}</li>
                              {item.meta_data.find((meta: any) => meta.key === "custom_name")?.display_value && (
                                <li>
                                  Name: {item.meta_data.find((meta: any) => meta.key === "custom_name").display_value}
                                </li>
                              )}

                              {item.meta_data.find((meta: any) => meta.key === "custom_card-number-optional")
                                ?.display_value && (
                                <li>
                                  Card Number:{" "}
                                  {
                                    item.meta_data.find((meta: any) => meta.key === "custom_card-number-optional")
                                      .display_value
                                  }
                                </li>
                              )}

                              {item.meta_data.find((meta: any) => meta.key === "custom_card-number-location")
                                ?.display_value && (
                                <li>
                                  Card Number Location:{" "}
                                  {
                                    item.meta_data.find((meta: any) => meta.key === "custom_card-number-location")
                                      .display_value
                                  }
                                </li>
                              )}

                              {item.meta_data.find((meta: any) => meta.key === "custom_card-name-placement")
                                ?.display_value && (
                                <li>
                                  Name Placement:{" "}
                                  {
                                    item.meta_data.find((meta: any) => meta.key === "custom_card-name-placement")
                                      .display_value
                                  }
                                </li>
                              )}
                            </ul>
                          </div>

                          <div className="lx-card-total flex xl:flex-col px-3 xl:flex-1 my-auto items-center justify-center flex-col gap-2">
                            <span className="uppercase text-gray-500">Product price</span>
                            <span className="font-bold sm:ms-3 md:ms-0 text-lg md:text-xl text-primary">
                              AED {item.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* {items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex border rounded-xl gap-4 overflow-hidden group flex-col md:flex-row xl:flex-row items-center justify-center"
                      >
                        <div className="overflow-hidden w-[250px] h-[130px] mt-4 md:mt-2 md:mb-2 bg-white flex justify-center my-auto">
                          <Image src={item.image.src} alt={item.name} height={150} width={200} />
                        </div>

                        <div className="flex items-center lg:items-start w-full gap-3 p-4 flex-col xl:flex-row justify-center xl:justify-start">
                          <div className="flex flex-col wrap px-3">
                            <h2 className="text-xl font-medium text-black m-0">{item.name}</h2>
                            <ul className="!list-disc ps-4 text-base text-gray-600 mt-3">
                              <li>
                                Variation:{" "}
                                {item.meta_data.find((meta: any) => meta.key === "pa_metal-finish")?.display_value !== "N/A"
                                  ? item.meta_data.find((meta: any) => meta.key === "pa_metal-finish")?.display_value
                                  : null}
                              </li>
                              <li>
                                Status:{" "}
                                <span
                                  className={`${
                                    item.orderStatus === "processing"
                                      ? "text-green-500"
                                      : item.orderStatus === "completed"
                                      ? "text-blue-500"
                                      : item.orderStatus === "trash"
                                      ? "text-red-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {item.orderStatus === "trash" ? "cancelled" : item.orderStatus}
                                </span>
                              </li>
                              <li>Quantity: {item.quantity}</li>

                              {item.meta_data
                                .filter((meta: any) => meta.display_value !== "N/A")
                                .map((meta: any) => (
                                  <li key={meta.id}>
                                    {meta.display_key || meta.key}: {meta.display_value}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div className="lx-card-total flex xl:flex-col px-3 xl:flex-1 my-auto items-center justify-center flex-col gap-2">
                            <span className="uppercase text-gray-500">Product price</span>
                            <span className="font-bold sm:ms-3 md:ms-0 text-lg md:text-xl text-primary">
                              AED {item.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              ))
            ) : loading ? (
              <LoadingSkeleton height={300} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                <div className="mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-40 w-40 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h2H7v4h2v-4zm-1-2h2V7h-2v4zm2-4h2V5h-2v4zm-2 2h2V11h-2v4zm-2-2h2v-4h-2v4zm-2 2h2V13h-2v4zm-2-2h2V9h-2v4zm-2 2h2V15h-2v4zm-2-2h2v-4h-2v4zm-2 2h2v-4h-2v4zm-2 2h2v-4h-2v4z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">No Orders Found</h2>
                <p className="mt-4 text-lg">You don&apos;t have any orders yet. Start shopping now!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    // <section className="services bg-white py-16 w-full px-0">
    //   <div className="container mx-auto px-4 md:px-6 lg:px-8">
    //     <div className="lx-card-listing-section">
    //       <div className="border-b-2 mb-[20px] py-3 flex flex-col">
    //         <h1 className="text-black text-2xl">My Orders</h1>
    //       </div>

    //       <div className="flex flex-col gap-10">
    //         {/* Map over line items */}
    //         {myLineItems.length > 0 ? (
    //           myLineItems.map((item) => (
    //             <div
    //               key={`${item.orderId}-${item.id}`}
    //               className="flex border rounded-xl gap-4 overflow-hidden group flex-col md:flex-row xl:flex-row"
    //             >
    //               <div className="overflow-hidden w-[250px] h-[130px] bg-white flex justify-center my-auto ">
    //                 <Image
    //                   src={item.image.src}
    //                   alt={item.name}
    //                   height={150}
    //                   width={200}
    //                 />
    //               </div>

    //               <div className="flex xl:items-center w-full gap-3 p-4 flex-col xl:flex-row justify-center xl:justify-start">
    //                 <div className="flex flex-col wrap px-3">
    //                   <h2 className="text-xl font-medium text-black m-0">
    //                     {item.name}
    //                   </h2>
    //                   <ul className="!list-disc ps-4 text-base text-gray-600 mt-3">
    //                     <li>
    //                       Variation :{" "}
    //                       {item.meta_data.find(
    //                         (meta: any) => meta.key === "pa_metal-finish"
    //                       )?.display_value || "N/A"}
    //                     </li>
    //                     {/* <li>QUANTITY : {item.quantity}</li> */}
    //                     <li>Order ID : {item.orderId}</li>
    //                     <li>
    //                       Status :{" "}
    //                       <span
    //                         className={`${
    //                           item.orderStatus === "processing"
    //                             ? "text-green-500"
    //                             : item.orderStatus === "cancelled"
    //                             ? "text-red-500"
    //                             : "text-gray-500"
    //                         }`}
    //                       >
    //                         {item.orderStatus === "cancelled"
    //                           ? status
    //                           : item.orderStatus}
    //                       </span>
    //                     </li>
    //                   </ul>
    //                 </div>

    //                 <div className="lx-card-total flex xl:flex-col px-3 xl:flex-1 items-center flex-row gap-2">
    //                   <span className="uppercase text-gray-500">Total</span>
    //                   <span className="font-bold sm:ms-3 md:ms-0 text-xl text-primary">
    //                     AED {item.orderTotal}
    //                   </span>
    //                 </div>

    //                 <div className="flex flex-row gap-2 wrap xl:px-10 lg:flex-row xl:flex-col">
    //                   {item.orderStatus === "pending" && (
    //                     <button
    //                       onClick={() => {
    //                         setCancelOrderId(item.orderId);
    //                         setShowCancelConfirmation(true);
    //                       }}
    //                       className="flex items-center rounded-full justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f]  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]"
    //                     >
    //                       {item.orderId === cancellingOrderId &&
    //                       status === "cancelling" ? (
    //                         <div className="relative">
    //                           <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
    //                           <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs"></span>
    //                         </div>
    //                       ) : (
    //                         "Cancel Order"
    //                       )}
    //                     </button>
    //                   )}
    //                   <a
    //                     className="px-5 py-2 border rounded-full border-gray-600 text-black text-center"
    //                     href=""
    //                   >
    //                     Cancel Order
    //                   </a>
    //                   {/* <a
    //                     className="px-5 py-2 border rounded-full border-gray-600 text-black text-center"
    //                     href=""
    //                   >
    //                     Contact Support
    //                   </a> */}
    //                 </div>
    //               </div>
    //             </div>
    //           ))
    //         ) : loading ? (
    //           <LoadingSkeleton height={300} />
    //         ) : (
    //           <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
    //             <div className="mb-6">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="mx-auto h-40 w-40 text-gray-400"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M9 13h2H7v4h2v-4zm-1-2h2V7h-2v4zm2-4h2V5h-2v4zm-2 2h2V11h-2v4zm-2-2h2v-4h-2v4zm-2 2h2V13h-2v4zm-2-2h2V9h-2v4zm-2 2h2V15h-2v4zm-2-2h2v-4h-2v4zm-2 2h2v-4h-2v4zm-2 2h2v-4h-2v4z"
    //                 />
    //               </svg>
    //             </div>
    //             <h2 className="text-3xl font-bold">No Orders Found</h2>
    //             <p className="mt-4 text-lg">
    //               You don&apos;t have any orders yet. Start shopping now!
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   {showCancelConfirmation && (
    //     <div className="fixed z-40 top-0 left-0 w-full h-full bg-[#0000004d] flex items-center justify-center">
    //       <div className="bg-white rounded-lg p-6">
    //         <h2 className="text-2xl font-bold text-black mb-4">
    //           Confirm cancellation
    //         </h2>
    //         <p className="text-lg text-gray-600 mb-6">
    //           Are you sure you want to cancel your order?
    //         </p>
    //         <div className="flex gap-2">
    //           <button
    //             onClick={() => setShowCancelConfirmation(false)}
    //             className="px-5 py-2 border rounded-full border-gray-600 text-black text-center"
    //           >
    //             No, keep order
    //           </button>
    //           <button
    //             onClick={() => {
    //               handleCancelOrder(cancelOrderId);
    //               setShowCancelConfirmation(false);
    //             }}
    //             className="px-5 py-2 border rounded-full border-[#b88c4f] text-white text-center bg-[#b88c4f]"
    //           >
    //             Yes, cancel order
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </section>

    // <section className="services bg-white py-16 w-full px-0">
    //   <div className="container mx-auto px-4 md:px-6 lg:px-8">
    //     <div className="lx-card-listing-section">
    //       <h1 className="text-black text-2xl mb-4">My Orders</h1>

    //       <div className="flex flex-col gap-10">
    //         {loading ? (
    //           <LoadingSkeleton height={300} />
    //         ) : myLineItems.length > 0 ? (
    //           myLineItems.map((item) => (
    //             <div
    //               key={`${item.orderId}-${item.id}`}
    //               className="flex border rounded-xl gap-4 overflow-hidden group flex-col md:flex-row"
    //             >
    //               <div className="w-[250px] h-[130px] bg-white flex justify-center items-center">
    //                 <Image
    //                   src={item.image.src || "/placeholder.png"}
    //                   alt={item.name}
    //                   height={150}
    //                   width={200}
    //                 />
    //               </div>
    //               <div className="flex flex-1 p-4 flex-col gap-3">
    //                 <h2 className="text-xl font-medium">{item.name}</h2>
    //                 <ul className="text-gray-600">
    //                   <li>
    //                     Variation:{" "}
    //                     {item.meta_data?.find(
    //                       (meta: any) => meta.key === "pa_metal-finish"
    //                     )?.value || "N/A"}
    //                   </li>
    //                   <li>Order ID: {item.orderId}</li>
    //                   <li>
    //                     Status:{" "}
    //                     <span
    //                       className={`${
    //                         item.orderStatus === "processing"
    //                           ? "text-green-500"
    //                           : item.orderStatus === "cancelled"
    //                           ? "text-red-500"
    //                           : "text-gray-500"
    //                       }`}
    //                     >
    //                       {item.orderStatus}
    //                     </span>
    //                   </li>
    //                 </ul>
    //                 <div className="text-lg font-bold">
    //                   Total: AED {item.orderTotal}
    //                 </div>
    //                 {item.orderStatus === "processing" && (
    //                   <button
    //                     onClick={() => {
    //                       setCancelOrderId(item.orderId);
    //                       setShowCancelConfirmation(true);
    //                     }}
    //                     className="bg-[#b88c4f] text-white px-4 py-2 rounded-full"
    //                   >
    //                     Cancel Order
    //                   </button>
    //                 )}
    //               </div>
    //             </div>
    //           ))
    //         ) : (
    //           <div className="text-center text-gray-600">
    //             <h2 className="text-3xl font-bold">No Orders Found</h2>
    //             <p className="mt-4">
    //               You don't have any orders yet. Start shopping now!
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   {showCancelConfirmation && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //       <div className="bg-white p-6 rounded-lg">
    //         <h2 className="text-2xl font-bold mb-4">Confirm cancellation</h2>
    //         <p className="text-lg text-gray-600 mb-6">
    //           Are you sure you want to cancel this order?
    //         </p>
    //         <div className="flex gap-4">
    //           <button
    //             onClick={() => setShowCancelConfirmation(false)}
    //             className="border px-4 py-2 rounded-full"
    //           >
    //             No, keep order
    //           </button>
    //           <button
    //             onClick={() => handleCancelOrder(cancelOrderId!)}
    //             className="bg-[#b88c4f] text-white px-4 py-2 rounded-full"
    //           >
    //             Yes, cancel order
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </section>
  );
};

export default MyOrders;
