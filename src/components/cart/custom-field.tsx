import { customFieldExclusionTexts } from "@/helper/constants";
import { ItemProps } from "@/redux/store/cart";
import React, { ReactNode } from "react";

const renderFieldRow = (field: any, key: string) => {
  if (field?.label.toLowerCase() === customFieldExclusionTexts?.customisedproduct) return null;
  if (field?.label.toLowerCase() === customFieldExclusionTexts?.uploadownlogo) return null;
  if (field?.label.toLowerCase() === customFieldExclusionTexts?.uploadowndesign) return null;
  if (field?.label.toLowerCase() === customFieldExclusionTexts?.digitalprofileimage) return null;
  if (field?.label.toLowerCase() === customFieldExclusionTexts?.chipsize) return null;

  const renderValue = () => {
    const containsLink = (value: string) => {
      return typeof value === "string" && (value.includes("www") || value.includes("http"));
    };

    if (containsLink(field?.value)) {
      return null;
    }

    if (field?.type === "image-group" && Array.isArray(field?.value)) {
      if (field?.value?.length === 0) return null;

      return field?.value.map((val: any, valIndex: number) => (
        <span key={valIndex} className="flex items-center">
          {/* {val?.image && (
            <img src={val?.image} alt={val?.label} className="w-8 h-8 mr-2" />
          )} */}
          <span>{val?.label || val?.value}</span>
        </span>
      ));
    } else if (field?.type === "text") {
      if (!field?.value || field?.value === "N/A") return null;
      return field?.value;
    } else if (field?.value === false || field?.value === null) {
      return null;
    } else if (typeof field?.value === "object" && field?.value !== null) {
      const firstItem = field?.value[Object.keys(field?.value)[0]];
      if (!firstItem || firstItem?.label === "N/A") return null;
      return firstItem ? firstItem?.label || firstItem?.value || JSON.stringify(firstItem) : null;
    } else if (field?.value) {
      return field?.value;
    } else {
      return null;
    }
  };

  const value = renderValue();
  if (value === null) return null;

  return (
    <tr key={key} className="border-b">
      <td className="text-gray-500 py-1 px-2">{field?.label}:</td>
      <td className="text-gray-500 py-1 px-2">{renderValue()}</td>
    </tr>
  );
};

export const CustomFields = ({ item }: { item: ItemProps }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-gray-700 py-1 px-2 text-left">Field</th>
            <th className="text-gray-700 py-1 px-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(item?.cart_item_data?.wcpa_data || {})
            .filter((key) => key.startsWith("sec"))
            .flatMap((secKey): ReactNode[] => {
              const section = item?.cart_item_data?.wcpa_data[secKey];
              if (!section?.fields || !Object.keys(section?.fields).length) {
                // If no fields, skip rendering
                return [];
              }

              if (Array.isArray(section?.fields)) {
                return section?.fields.flatMap((fieldGroup, groupIndex) => {
                  if (!Array.isArray(fieldGroup)) return null;

                  return fieldGroup
                    .filter((field) => !!field?.value)
                    .map((field, fieldIndex) => renderFieldRow(field, `${secKey}-${groupIndex}-field-${fieldIndex}`));
                });
              } else {
                return Object.keys(section?.fields).flatMap((key) => {
                  const fieldGroup = section?.fields[key];
                  return fieldGroup
                    .filter((field) => !!field?.value)
                    .map((field: any, fieldIndex: number) =>
                      renderFieldRow(field, `${secKey}-${key}-field-${fieldIndex}`)
                    );
                });
              }
            })
            .filter(Boolean)}
        </tbody>
      </table>
    </div>
  );
};

export default CustomFields;
