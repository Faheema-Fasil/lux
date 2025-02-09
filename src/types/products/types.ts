export interface ProductListingProps {
    products: any;
}

//Variation Interface
export interface ProductLinks {
    self: Array<{
        href: string;
        targetHints?: {
            allow: string[];
        };
    }>;
    collection: Array<{
        href: string;
    }>;
    up?: Array<{
        href: string;
    }>;
}

export interface GalleryImage {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    url: string;
    name: string;
    alt: string;
}

export interface ProductAttribute {
    id: number;
    name: string;
    slug: string;
    option: string;
}

export interface Dimension {
    length: string;
    width: string;
    height: string;
}

export interface MetaData {
    id: number;
    key: string;
    value: string | number | boolean | null;
}

export interface VariationProps {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string | null;
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    low_stock_amount: number | null;
    sold_individually: boolean;
    weight: string;
    dimensions: Dimension;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: any[];
    tags: any[];
    images: GalleryImage[];
    thumbnail: string[],
    attributes: ProductAttribute[];
    default_attributes: any[];
    variations: number[];
    grouped_products: any[];
    menu_order: number;
    price_html: string;
    related_ids: number[];
    meta_data: MetaData[];
    stock_status: string;
    has_options: boolean;
    post_password: string;
    global_unique_id: string;
    wcpa_form_fields: any;
    acf: any[];
    _links: ProductLinks;
    galleryImages: GalleryImage[];
}


//Product Interface
export interface ProductImage {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ProductAttribute {
    id: number;
    name: string;
    slug: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

export interface DefaultAttribute {
    id: number;
    name: string;
    option: string;
}

export interface Dimension {
    length: string;
    width: string;
    height: string;
}

export interface MetaData {
    id: number;
    key: string;
    value: string | number | boolean | null;
}

// export interface ProductWcpaFormFields {
//     // [sectionKey: string]
//     wcpaData: {
//         extra: {
//             key: string;
//             section_id: string;
//             name: string;
//             status: number;
//             toggle: boolean;
//             form_id: number;
//             form_rules: {
//                 exclude_from_discount: boolean;
//                 fee_label: string;
//                 disp_hide_options_price: boolean;
//                 disp_show_section_price: boolean;
//                 disp_show_field_price: boolean;
//                 layout_option: string;
//                 pric_use_as_fee: boolean;
//                 process_fee_as: string;
//             };
//             layout_option: string;
//         };
//         fields: Array<Array<{
//             active: boolean;
//             col: number;
//             relations: boolean;
//             cl_rule: string;
//             enableCl: boolean;
//             price: string;
//             enablePrice: boolean;
//             className: string;
//             type: string;
//             subtype?: string;
//             required: boolean;
//             elementId: string;
//             label: string;
//             name: string;
//             value: string | number | boolean;
//             error: boolean;
//             placeholder?: string;
//             description?: string;
//             gt_translate_keys: string[];
//             price_dependency: boolean;
//             cl_dependency: boolean;
//             values?: Array<{
//                 label: string;
//                 value: string;
//                 selected: boolean;
//                 tempId: string;
//                 gt_translate_keys: string[];
//             }>;
//         }>>;
//     };
// }

export interface ProductWcpaData {
    product: {
        product_price: number;
        price_html: string;
        original_product_price: number;
        price_including_tax: number;
        price_excluding_tax: number;
        product_id: {
            parent: number;
            variation: boolean;
        };
        is_variable: boolean;
        stock_status: string;
        stock_quantity: number | null;
        parent_sku: string;
        product_attributes: {
            [key: string]: {
                is_variation: boolean;
                values: string[];
            };
        };
        custom_fields: any[];
        is_taxable: boolean;
        product_name: string;
    };
    fields: any;
    config: {
        price_override: string;
        enable_recaptcha: boolean;
        bind_quantity: boolean;
        quantity_bind_formula: boolean;
        disp_summ_show_option_price: boolean;
        disp_summ_show_product_price: boolean;
        disp_summ_show_total_price: boolean;
        disp_summ_show_fee: boolean;
        disp_summ_show_discount: boolean;
        summary_title: string;
        options_total_label: string;
        total_label: string;
        options_product_label: string;
        fee_label: string;
        discount_label: string;
        has_price: boolean;
        has_quantity_formula: boolean;
    };
    mc_unit: number;
    tax_rate: number;
    tax_rate_real: number;
    discount: {
        percentage: number;
        fixed: number;
    };
    design: {
        conf: {
            LabelPosition: string;
            DescPosition: string;
            UploadField: string;
            QuantityFieldStyle: string;
        };
        css: {
            LeftLabelWidth: string;
        };
    };
    formulas: any[];
    clones: boolean;
    cartKey: boolean;
}

export interface ProductProps {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    low_stock_amount: number | null;
    sold_individually: boolean;
    weight: string;
    dimensions: Dimension;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: ProductCategory[];
    tags: any[];
    images: ProductImage[];
    attributes: ProductAttribute[];
    default_attributes: DefaultAttribute[];
    variations: VariationProps[];
    grouped_products: any[];
    menu_order: number;
    price_html: string;
    related_ids: number[];
    meta_data: MetaData[];
    stock_status: string;
    has_options: boolean;
    post_password: string;
    global_unique_id: string;
    wcpa_form_fields: {
        wcpaData: {
            extra: {
                key: string;
                section_id: string;
                name: string;
                status: number;
                toggle: boolean;
                form_id: number;
                form_rules: {
                    exclude_from_discount: boolean;
                    fee_label: string;
                    disp_hide_options_price: boolean;
                    disp_show_section_price: boolean;
                    disp_show_field_price: boolean;
                    layout_option: string;
                    pric_use_as_fee: boolean;
                    process_fee_as: string;
                };
                layout_option: string;
            };
            fields: {
                [key: string]: {
                    fields: any;
                };
            }
            // fields: Array<Array<{
            //     active: boolean;
            //     col: number;
            //     relations: boolean;
            //     cl_rule: string;
            //     enableCl: boolean;
            //     price: string;
            //     enablePrice: boolean;
            //     className: string;
            //     type: string;
            //     subtype?: string;
            //     required: boolean;
            //     elementId: string;
            //     label: string;
            //     name: string;
            //     value: string | number | boolean;
            //     error: boolean;
            //     placeholder?: string;
            //     description?: string;
            //     gt_translate_keys: string[];
            //     price_dependency: boolean;
            //     cl_dependency: boolean;
                
            //     values?: Array<{
            //         label: string;
            //         value: string;
            //         selected: boolean;
            //         tempId: string;
            //         gt_translate_keys: string[];
            //     }>;
            // }>>;
        };
    };
    acf: any[];
    _links: {
        self: Array<{
            href: string;
            targetHints: {
                allow: string[];
            };
        }>;
        collection: Array<{
            href: string;
        }>;
    };
}

export interface OrderTotals {
    subtotal: string;
    subtotal_tax: string;
    fee_total: string;
    fee_tax: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    total: string;
    total_tax: string;
}

