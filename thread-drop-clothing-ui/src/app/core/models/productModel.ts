export interface Image {
    altText?: string;
    originalSrc?: string;
}
export interface Product {
    handle?: string;
    description?: string;
    id?: string;
    images?: Image[];
    title?: string;
    productSize?: string;
    price?: string;
    variants?:any;
    variantId?: string;
}[]