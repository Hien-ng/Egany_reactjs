// import axiosClient from "./axiosClient";
import { FAKE_PRODUCT_LIST } from "./fakeData";

// api/productApi.js
const productApi = {
    getAll: (params) => {
        console.log(params.search);
        return new Promise((resolve) => {
            setTimeout(() => {
                if (params.search) {
                    const newData = FAKE_PRODUCT_LIST.products.filter(element => element.title.indexOf(params.search) >= 0)
                    resolve({ products: newData })
                }
                resolve(FAKE_PRODUCT_LIST)
            }, 200)
        })
    },
}

export default productApi;