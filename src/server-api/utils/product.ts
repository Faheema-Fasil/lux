// import ProductBrand from "@/shared-pages/products/product-detail/product-tabs/product-brand";
// import ProductDescription from "@/shared-pages/products/product-detail/product-tabs/product-description";
// import ProductFeatures from "@/shared-pages/products/product-detail/product-tabs/product-features";
// import FilterMobileAttributes from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-attributes";
// import FilterMobileBrand from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-brand";
// import FilterMobileCategory from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-category";
// import FilterMobileDiscount from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-discount";
// import FilterMobilePrice from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-price";
// import FilterMobileSpecification from "@/shared-pages/products/product-listing/filters/filters-mobile/filter-mobile-specification";

interface CartProduct {
    variantId: string;
    quantity: number;
}

// interface ProductVariant {
//     _id: string;
// }

interface DefaultProductVariantData {
    _id: string;
}

export const productFilterKeys = [
    'page_size',
    'limit',
    'keyword',
    'sortby',
    'sortorder',
    'status',
    'category',
    'brand',
    'collectionproduct',
    'collectioncategory',
    'collectionbrand',
    'getattribute',
    'getspecification',
    'categories',
    'brands',
    'offer',
    'sortby',
    'sortorder',
    'attribute',
    'specification',
    'maxprice',
    'minprice',
    'discount',
    'slug'
];

export const discounts = [
    { value: '10', label: '10% Or More' },
    { value: '20', label: '20% Or More' },
    { value: '30', label: '30% Or More' },
    { value: '40', label: '40% Or More' },
    { value: '50', label: '50% Or More' },
    { value: '60', label: '60% Or More' },
    { value: '70', label: '70% Or More' },
    // { value: '90', label: '90% Or More' },
]

export const sortBy = [
    {
        id: 1, value: 'createdat', label: 'Latest', ascending: 'desc'
    },
    {
        id: 2, value: 'price', label: 'Price: High to Low', ascending: 'desc'
    },
    {
        id: 3, value: 'price', label: 'Price: Low to High', ascending: 'asc'
    },
    {
        id: 4, value: 'productTitle', label: 'Name: A to Z', ascending: 'asc'
    },
    {
        id: 5, value: 'productTitle', label: 'Name: Z to A', ascending: 'desc'
    },
]

export const filterTabValues = {
    categories: 'categories',
    brands: 'brands',
    price: 'price',
    discount: 'discount'
}

export const filterDynamicTabValues = {
    attributes: 'attributes',
    specifications: 'specifications',
}

export const filterTabParts = {
    [filterTabValues.categories]: filterTabValues.categories,
    [filterTabValues.brands]: filterTabValues.brands,
    [filterDynamicTabValues.attributes]: filterDynamicTabValues.attributes,
    [filterDynamicTabValues.specifications]: filterDynamicTabValues.specifications,
    // [filterTabValues.price]: filterTabValues.price,
    [filterTabValues.discount]: filterTabValues.discount,
};

export const MAP_STEP_TO_COMPONENT = {
    // [filterTabParts[filterTabValues.categories]]: FilterMobileCategory,
    // [filterTabParts[filterTabValues.brands]]: FilterMobileBrand,
    // [filterTabParts[filterDynamicTabValues.attributes]]: FilterMobileAttributes,
    // [filterTabParts[filterDynamicTabValues.specifications]]: FilterMobileSpecification,
    // // [filterTabParts[filterTabValues.price]]: FilterMobilePrice,
    // [filterTabParts[filterTabValues.discount]]: FilterMobileDiscount,
};

export const filterTabs = [
    {
        value: filterTabValues.categories, label: "Categories"
    },
    {
        value: filterTabValues.brands, label: "Brands"
    },
    // {
    //     value: filterTabValues.price, label: "Price"
    // },
    {
        value: filterTabValues.discount, label: "Discount"
    },
]


export const attributeTypes = {
    text: 'text',
    hex: 'hex',
    pattern: 'pattern',
}



export const productDetailTabValues = {
    productDescription: 'product-description',
    fromBrand: 'from-brand',
    features: 'features',
}

export const productDetailTabParts = {
    [productDetailTabValues.productDescription]: productDetailTabValues.productDescription,
    [productDetailTabValues.features]: productDetailTabValues.features,
    [productDetailTabValues.fromBrand]: productDetailTabValues.fromBrand,
};

export const PRODUCT_DETAILS_MAP_STEP_TO_COMPONENT = {
    // [productDetailTabParts[productDetailTabValues.productDescription]]: ProductDescription,
    // [productDetailTabParts[productDetailTabValues.features]]: ProductFeatures,
    // [productDetailTabParts[productDetailTabValues.fromBrand]]: ProductBrand,
};

export const productDetailTabs = [
    {
        value: productDetailTabValues.productDescription, label: "Product Description"
    },
    {
        value: productDetailTabValues.features, label: "Features"
    },
    {
        value: productDetailTabValues.fromBrand, label: "From Brand"
    },
]




export function getTotalQuantity(cartProducts: CartProduct[], defaultProductVariantData: DefaultProductVariantData): number {
    const totalQuantity = cartProducts.reduce((totalQuantity, product) => {
        if (product && defaultProductVariantData && (product.variantId === defaultProductVariantData?._id)) {
            return totalQuantity + product.quantity;
        }
        return totalQuantity;
    }, 0);

    return totalQuantity > 0 ? totalQuantity : 1;
}
