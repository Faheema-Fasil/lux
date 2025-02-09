import { countryCodes } from "@/helper/country";
import React from "react";

const PhoneNumberInput = ({
  selectedCode,
  handleCountryChange,
  phoneNumberValue,
  handleInputChange,
}: any) => {
  return (
    <>
      <select
        value={selectedCode}
        onChange={handleCountryChange}
        className="rounded-lg border max-w-[150px] border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
      >
        {countryCodes.map((country) => (
          <option key={country.iso} value={country.code}>
            {selectedCode === country.code
              ? `${country.code} (${country.country})`
              : `${country.country} (${country.code})`}
          </option>
        ))}
      </select>
      <input
        type="text"
        maxLength={11}
        value={phoneNumberValue}
        onChange={handleInputChange}
        placeholder="Phone Number"
        className="flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
      />
    </>
  );
};

export default PhoneNumberInput;

