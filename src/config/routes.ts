export const routes = {
    indexPage: '/',
    login: '/login',
    register: '/register',
    verifyOtp: '/verify-otp',
    forgotYourPassword: '/forgot-your-password',
    wishlist: '/wishlist',

    product: {
        // productsListing: (queryString?: any) => {
        //     let route = '/products-listing';
        //     if (queryString) {
        //         if (typeof queryString === 'string') {
        //             route += `/${queryString}`;
        //         } else if (typeof queryString === 'object') {
        //             const queryParams = new URLSearchParams(queryString).toString();
        //             route += `?${queryParams}`;
        //         }
        //     }
        //     return route;
        // },
        productsDetail: (id?: number, sku?: string) => `/product-detail/${id}${sku ? `/${sku}` : ``}`,
    },


}
