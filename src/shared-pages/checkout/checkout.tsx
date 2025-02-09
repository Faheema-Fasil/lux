"use client";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getCountryDataApi,
  placeGuestOrderApi,
  placeOrderApi,
  updateCustomerAddress,
} from "@/server-api/apifunctions/apiService";
import { extractPhoneDetails } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCartData } from "@/redux/store/cart";
import { toast } from "react-toastify";
import { useProductImageContext } from "@/components/context/product-image-context";
import OrderSuccessPage from "@/app/(pages)/order-response/[oid]/page";
import CheckoutSummary from "./checkout-summary";
import PaymentSection from "./payment-section";
import Login from "../login";
import { setShippingCountry } from "@/redux/store/cart/cartSlice";
import {
  checkoutLabels,
  checkoutPlaceholderTexts,
  checkoutValidationMessages,
  deliveryMethodTypes,
} from "@/helper/constants";
import { validateFormData } from "@/helper/validation-schema";
import { baseUrl, consumer_key, consumer_secret, createServerConnectAPI } from "@/server-api/config/server-connect-api";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { getCartKey, getToken } from "@/storage";
import axios from "axios";

const paymentMethods = [
  {
    id: "card",
    label: "Credit Card",
    description: "Pay with your credit card",
    defaultChecked: true,
  },
];

interface CountryProps {
  iso2: string;
  name: string;
  phonecode: string;
}

interface CityProps {
  iso2: string;
  name: string;
}

export const Checkout = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, displayName, email } = useSelector((state: RootState) => state.auth);
  const { customer, items, totals, currency, int_shipping_charge } = useSelector((state: RootState) => state.cart);

  const { productData } = useProductImageContext();
  const [cities, setCities] = useState<CityProps[]>();
  const [countries, setCountries] = useState<CountryProps[]>();

  // const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [processCheckout, setProcessCheckout] = useState(false);

  // const [deliveryMethods, setDeliveryMethods] = useState<any>([]);

  const [status, setStatus] = useState<"loading" | "success" | "error">();
  // const [deliveryMethodLoading, setDeliveryMethodLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const { countryCode, number } = extractPhoneDetails(customer.billing_address.billing_phone || "");

  const [formData, setFormData] = useState({
    email: customer.billing_address.billing_email || email || "",
    shippingname: customer.shipping_address.shipping_first_name || displayName || "",
    shippingaddress: customer.shipping_address.shipping_address_1 || "",
    shippingcity: customer.shipping_address.shipping_city || "",
    shippingcountry: customer.shipping_address.shipping_country || "",
    shippingzipcode: customer.shipping_address.shipping_postcode || "",
    shippingphone: number || "",
    // paymentMethod: selectedPayment || "",
    password: "",
    confirmpassword: "",
    deliveryMethod: "",
    note: "",
  });

  const [selectedCode, setSelectedCode] = useState(countryCode || "");
  const [initialData, setInitialData] = useState(formData);

  const getCartKeyDynamic: any = () => getCartKey();
  const getTokenDynamic = () => getToken();

  useEffect(() => {
    const initializeShippingAddress = async () => {
      const countryData = await getCountryDataApi();
      if (countryData) {
        setCountries(countryData.data);

        // Automatically set the selected country if available in customer data
        const shippingCountry = customer.shipping_address.shipping_country;
        const shippingCity = customer.shipping_address.shipping_city;

        if (shippingCountry) {
          setSelectedCountry(shippingCountry);
          setFormData((prevFormData) => ({
            ...prevFormData,
            shippingcountry: shippingCountry,
          }));

          // Fetch cities for the pre-selected country
          const citiesData = await getCountryDataApi(shippingCountry);
          if (citiesData) {
            const mappedCities = citiesData.data.map((city: CityProps) => ({
              name: city.name,
              iso2: city.iso2,
            }));
            setCities(mappedCities);

            // Automatically select the city if available in customer data
            if (shippingCity && citiesData) {
              const cityExists = mappedCities.some((city: any) => city.iso2 === shippingCity);
              if (cityExists) {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  shippingcity: shippingCity,
                }));
              } else {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  shippingcity: "",
                }));
              }
            }
          }
        }
      }
    };

    initializeShippingAddress();
  }, [customer]); // Add `customer` as a dependency to re-run if it changes

  useEffect(() => {
    setInitialData(formData);
    if (customer.billing_address.billing_phone === "") {
      setSelectedCode("+971");
    }
    if (customer.shipping_address.shipping_country) {
      setSelectedCountry(customer.shipping_address.shipping_country);
    }
    if (!countryCode) {
      setSelectedCode("+971");
    }
  }, [customer]);

  const filteredMethods =
    formData.shippingcountry === "AE"
      ? deliveryMethodTypes.uae.map((method) => ({
          ...method,
        }))
      : deliveryMethodTypes.international.map((method) => ({
          ...method,
        }));

  const handleCheckboxChange = (e: any) => {
    setIsCreatingAccount(!isCreatingAccount);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      shippingphone: event.target.value,
    }));
  };

  const handlePhoneCountryChange = (event: any) => {
    setSelectedCode(event.target.value);
  };

  const handleDeliveryMethod = (method: string) => {
    setSelectedDelivery(method);
    setFormData((prevData) => ({
      ...prevData,
      deliveryMethod: method,
    }));
  };
  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shippingCountry = event.target.value;
    setStatus("loading");

    // Clear selected city and delivery method immediately
    setFormData((prevFormData) => ({
      ...prevFormData,
      shippingcountry: shippingCountry,
      shippingcity: "", // Clear city when country changes
      shippingzipcode: "", // Clear zipcode
      deliveryMethod: "", // Clear delivery method
    }));

    setSelectedCountry(shippingCountry);
    setCities([]); // Clear cities while fetching new data
    setSelectedDelivery("");

    // Dispatch Redux action to update the country in the global state
    dispatch(setShippingCountry(shippingCountry));

    // Fetch cities for the selected country
    const citiesData = await getCountryDataApi(shippingCountry);

    if (citiesData) {
      setCities(
        citiesData.data.map((city: CityProps) => ({
          name: city.name,
          iso2: city.iso2,
        }))
      );
      setStatus("success");
    } else {
      setCities([]);
      setStatus("success");
    }
  };

  useEffect(() => {
    const errors = validateFormData(formData, selectedCode, isCreatingAccount);
    setProcessCheckout(errors.length === 0);
  }, [formData, isCreatingAccount]);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const errors = validateFormData(formData, selectedCode, isCreatingAccount);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    const fullPhoneNumber = `${selectedCode}${formData.shippingphone}`;
    const formDataToSend = {
      ...formData,
      shippingphone: fullPhoneNumber,
      int_shipping_charge: int_shipping_charge
    };

    try {
      setStatus("loading");

      const hasAddressChanged =
        formDataToSend.shippingaddress !== initialData.shippingaddress ||
        formDataToSend.shippingphone !== initialData.shippingphone ||
        formDataToSend.shippingname !== initialData.shippingname ||
        formDataToSend.shippingcountry !== initialData.shippingcountry ||
        formDataToSend.shippingzipcode !== initialData.shippingzipcode ||
        formDataToSend.shippingcity !== initialData.shippingcity;

      if (hasAddressChanged && isAuthenticated) {
        await updateCustomerAddress("shipping", formDataToSend);
      }

      if (processCheckout) {
        let response;
        if (isAuthenticated) {
          //Call placeOrderApi
          response = await placeOrderApi(formDataToSend);
          setStatus("success");
        } else {
          response = await placeGuestOrderApi("shipping", formDataToSend);
          //Call placeGuestOrderApi
          setStatus("success");
        }
        if (response.url) {
          setStatus("success");
          window.location.href = response.url;
        } else {
          toast.error("Failed to place the order");
          setStatus("error");
        }
      }
    } catch (error) {
      setStatus("error");
      toast.error("Failed to place the order");
      console.error("Error processing order:", error);
    }
  };


  if (!items.length) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-bold tracking-wide text-gray-600 dark:text-gray-300">Your cart is empty</h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Please add some items to your cart to continue.</p>
      </div>
    );
  }

  // if (!isAuthenticated && !guestCheckoutSelected) {
  //   return (
  //     <Login
  //       checkoutPage={true}
  //       setIsGuestCheckoutSelected={setIsGuestCheckoutSelected}
  //     />
  //   );
  // }

  return (
    <>
      <div className=" bg-white">
        <div className="sm:px-10 md:container mx-auto py-8 antialiased dark:bg-gray-900 md:pt-16 pb-20  ">
          <form action="#" className="mx-auto max-w-screen-2xl px-4 2xl:px-0" onSubmit={handleFormSubmit}>
            <p className="mukta-medium text-gray-600">
              {checkoutLabels.loggedInAs}{" "}
              <span className="text-green-600 font-bold">{displayName ? displayName : "Guest"}</span>
            </p>

            {/* {(isAuthenticated && displayName) || guestCheckoutSelected ? (
            <p className="mukta-medium text-gray-600">
              {checkoutLabels.loggedInAs}{" "}
              <span className="text-green-600 font-bold">
                {displayName ? displayName : "Guest"}
              </span>
            </p>
          ) : (
            <p className="mukta-medium text-gray-600">
              {checkoutLabels.notLoggedIn}
            </p>
          )} */}
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 space-y-8">
                <div className="mt-10 bg-gray-50  px-10 pt-8 pb-8 lg:mt-0">
                  <p className="text-3xl font-medium font-philosopher">{checkoutLabels.addShippingAddress}</p>
                  <p className="text-gray-400 mt-2">{checkoutLabels.completeOrder}</p>
                  <div>
                    <label htmlFor="shippingname" className="mt-4 mb-2 block text-sm font-medium">
                      {checkoutLabels.shippingName}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="shippingname"
                        name="shippingname"
                        value={formData.shippingname}
                        onChange={handleInputChange}
                        className="w-full border border-black/55 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                        placeholder="Your name"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                      {checkoutLabels.email}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full  border border-black/55 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                        placeholder="example@gmail.com"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                    </div>

                    <label htmlFor="phone-no" className="mt-4 mb-2 block text-sm font-medium">
                      {checkoutLabels.phoneNumber}
                    </label>
                    <div className="flex gap-5 md:gap-3 flex-col md:flex-row w-full">
                      <select
                        value={selectedCode}
                        onChange={handlePhoneCountryChange}
                        className=" border w-full md:max-w-[230px] border-black/55 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                      >
                        <option value="">{checkoutPlaceholderTexts.selectCountry}</option>
                        {countries &&
                          countries.map((country) => (
                            <option key={country.iso2} value={country.phonecode}>
                              {selectedCode === country.phonecode
                                ? `(${country.phonecode}) ${country.name}`
                                : `${country.name} (${country.phonecode})`}
                            </option>
                          ))}
                      </select>
                      <input
                        type="text"
                        maxLength={11}
                        name="shippingphone"
                        value={formData.shippingphone}
                        onChange={handlePhoneNumberChange}
                        placeholder="Phone Number"
                        className="flex-1  border border-black/55 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">
                      {checkoutLabels.shippingAddress}
                    </label>
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative flex-shrink-0 sm:w-full">
                        <input
                          type="text"
                          id="billing-address"
                          name="shippingaddress"
                          value={formData.shippingaddress}
                          onChange={handleInputChange}
                          className="w-full  border border-black/55 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                          placeholder="Street Address"
                        />
                      </div>
                    </div>

                    <div className="flex-col md:flex-row flex gap-3 mt-4">
                      <div className="flex-1">
                        <label htmlFor="shippingcountry" className="mb-2 block text-sm font-medium">
                          {checkoutLabels.country}
                        </label>
                        <select
                          name="shippingcountry"
                          value={formData.shippingcountry}
                          onChange={handleCountryChange}
                          className="w-full  border border-black/55 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                        >
                          <option value="">Select Country</option>
                          {countries &&
                            countries.map((country) => (
                              <option key={country.iso2} value={country.iso2}>
                                {country.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label htmlFor="shippingcity" className="mb-2 block text-sm font-medium">
                          {checkoutLabels.city}
                        </label>
                        <select
                          name="shippingcity"
                          value={formData.shippingcity || ""}
                          disabled={cities && cities.length === 0}
                          onChange={handleInputChange}
                          className="w-full  border border-black/80 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                        >
                          {cities && cities.length === 0 ? (
                            <option value="">{checkoutPlaceholderTexts.selectCity}</option>
                          ) : (
                            <>
                              <option value="">{checkoutPlaceholderTexts.selectCity}</option>
                              {cities &&
                                cities.map((city, index) => (
                                  <option key={`${city.name}-${index}`} value={city.iso2}>
                                    {city.name}
                                  </option>
                                ))}
                            </>
                          )}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label htmlFor="shippingzipcode" className="mb-2 block text-sm font-medium">
                          {checkoutLabels.zipCode}
                        </label>
                        <input
                          type="text"
                          name="shippingzipcode"
                          value={formData.shippingzipcode}
                          onChange={handleInputChange}
                          className="w-full  border border-black/55 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary"
                          placeholder="ZIP"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="space-y-4 transition-all duration-300 ease-in-out">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isCreatingAccount"
                        checked={isCreatingAccount}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 border-gray-300 rounded"
                        id="isCreatingAccount"
                      />
                      <label
                        htmlFor="isCreatingAccount"
                        className="ml-2 text-md font-medium text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCheckboxChange(e);
                        }}
                      >
                        I want to create an account
                      </label>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        isCreatingAccount ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      {isCreatingAccount && (
                        <>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              New Password:
                              <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full focus:border-primary focus:ring-primary"
                              />
                            </label>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Confirm New Password:
                              <input
                                type="password"
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full  focus:border-primary focus:ring-primary"
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <form className="mt-5 grid gap-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {checkoutLabels.deliveryMethods}
                  </h3>
                  {!formData.shippingcountry ? (
                    <div className="text-center text-gray-500">
                      Please select a country to see available delivery methods.
                    </div>
                  ) : filteredMethods.length === 0 ? (
                    <div className="text-center text-gray-500">No delivery methods available for this country.</div>
                  ) : (
                    filteredMethods.map((method) => (
                      <div className="relative" key={method.id}>
                        <input
                          className="peer hidden"
                          id={method.id}
                          type="radio"
                          name="radio"
                          onClick={() => handleDeliveryMethod(method.id)}
                          checked={selectedDelivery === method.id}
                        />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                        <label
                          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          htmlFor={method.id}
                        >
                          <div className="ml-0 md:ml-5">
                            <span className="mt-2 font-semibold text-md md:text-lg">{method.label.includes("International") ? `AED ${int_shipping_charge + method.label}` : method.label}</span>
                            <p className="text-slate-500 text-xs md:text-sm max-w-48 md:max-w-full leading-5 md:leading-6">
                              {method.description}
                            </p>
                          </div>
                        </label>
                      </div>
                    ))
                  )}
                </form>
              </div>

              {/* Cart Summary Section */}
              <CheckoutSummary
                productData={productData}
                handleFormSubmit={handleFormSubmit}
                currency={currency}
                totals={totals}
                items={items}
                selectedCountry={selectedCountry}
                isdisabled={!processCheckout}
              />
            </div>
          </form>
        </div>

        {status === "loading" && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 overflow-hidden">
            <div className="flex items-center">
              <svg
                className="animate-spin h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <style jsx>{`
              body {
                overflow: hidden;
              }
            `}</style>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
