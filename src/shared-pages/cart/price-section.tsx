"use client";
import { RootState } from "@/redux/store";
import { CurrencyProps, TotalsProps } from "@/redux/store/cart";
import { formatPrice } from "@/helper/helper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFooterContentApi } from "@/server-api/apifunctions/apiService";

export const PriceSection = ({ totals }: { totals: TotalsProps; selectedCountry?: string }) => {
  const { customer, selected_country, int_shipping_charge } = useSelector((state: RootState) => state.cart);
  // const [shippingCharge, setShippingCharge] = useState<number>(0)

  // useEffect(() => {
  //   const getShippingCharge = async () => {
  //     const footerData = await fetchFooterContentApi();
  //     const { int_shipping_charge } = footerData;
  //     setShippingCharge(int_shipping_charge);
  //   }
  //   getShippingCharge();
  // }, [])

  // //console.log("totals",totals)
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
        <span>Subtotal</span>
        <span>{formatPrice(totals.subtotal)}</span>
      </div>

      {Number(totals.discount_total) > 0 && (
        <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
          <span>Discount</span>
          <span className="text-green-500 ">- {formatPrice(totals.discount_total)}</span>
        </div>
      )}

      {(selected_country ? selected_country : customer.shipping_address.shipping_country) === "AE" && (
        <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
          <span>Shipping Charges</span>
          <span className="text-green-500">FREE</span>
        </div>
      )}

      {(selected_country ? selected_country : customer?.shipping_address?.shipping_country) !== "AE" &&
        int_shipping_charge && (
          <div className="flex justify-between text-md font-medium text-gray-700 mb-2">
            <span>Shipping Charges</span>
            <span className="">AED {int_shipping_charge && int_shipping_charge}.00</span>
          </div>
        )}

      {/* No COD orders */}
      {/* <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
      <span>COD Charges
      </span>
      <span>AED 10
      </span>
    </div> */}

      {/* Gift wrapping charges */}
      {/* <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
      <span>Gift Wrap Charges
      </span>
      <span>AED 2
      </span>
    </div> */}

      <div className="my-4 border-b border-default-200"></div>
      <div className="flex justify-between text-md font-medium text-gray-900 mb-2">
        <span>Total</span>
        <span className="text-base font-bold text-default-700">
          {(selected_country ? selected_country : customer.shipping_address.shipping_country) !== "AE"
            ? formatPrice(Number(totals.total) + (int_shipping_charge ? int_shipping_charge * 100 : 0))
            : formatPrice(totals.total)}
        </span>
      </div>
    </div>
  );
};

export default PriceSection;
