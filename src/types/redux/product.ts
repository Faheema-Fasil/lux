
export interface ProductState {
    products: unknown[];
    filterChanged: boolean;
    gridColumnsChanged: boolean;
    productLoading: boolean;
    stopProductReLoading: boolean;
    productSpreadOperation: boolean;
    productPageSize: number;
    discountRanges: unknown[];
    filterBrands: unknown[];
    filterAttributes: unknown[];
    totalProductsCount: number;
    categorySlug: string | null;
    brandSlug: string | null;
    collectionId: string | null;
    randomValue: number;
}

export interface ProductAttribute {
    attributeType: string;
    attributeDetail: {
        _id: string;
        itemName: string;
        itemValue: string;
    };
}

export interface ProductDetailsState {
    currentVariantSku: string | null;
    currentVariantId: string | null;
    productDetails: unknown;
    productVariants: unknown;
    productGallerImages: unknown[];
    productSpecification: unknown[];
    defaultProductVariantData: unknown;
    allProductVariantAttributes: unknown;
    productDetailsLoading: boolean;
    hexAttributes: ProductAttribute[];
    textAttributes: ProductAttribute[];
    patternAttributes: ProductAttribute[];
    selectedAttribute: {
        selectedTextAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
        selectedHexAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
        selectedPatternAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
    };
    matchedAttributeDetail: {
        hexAttributes: unknown[];
        textAttributes: unknown[];
        patternAttributes: unknown[];
    }
    changeAttributeType: string
    selectedVariantId: string | null
}