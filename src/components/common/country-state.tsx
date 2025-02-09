import { countries } from "@/helper/country";
import React, { useState } from "react";

const CountryStateInput = ({ formData, setFormData }: any) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);

    const country = countries.find((c) => c.code2 === countryCode);
    if (country && country.states) {
      setCities(
        country.states.map((state) => ({
          label: state.name,
          value: state.code,
        }))
      );
    } else {
      setCities([]);
    }

    setFormData({ ...formData, shippingcountry: countryCode });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = event.target.value;

    setFormData({ ...formData, shippingcity: cityCode });
  };

  return (
    <>
      {/* Country Selector */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="shippingcountry"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Country*
          </label>
        </div>
        <select
          name="shippingcountry"
          value={selectedCountry}
          onChange={handleCountryChange}
          required
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code2} value={country.code2}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Selector */}
      <div className="">
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="shippingcity"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            City*
          </label>
        </div>
        <select
          id="shippingcity"
          disabled={cities.length === 0}
          value={formData.shippingcity || ""}
          onChange={handleCityChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        >
          {cities.length === 0 ? (
            <option value="">Select a Country First</option>
          ) : (
            cities.map((city, index) => (
              <option key={index} value={city.value}>
                {city.label}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
};

export default CountryStateInput;

