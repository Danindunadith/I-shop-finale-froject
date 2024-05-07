import axios from "axios";
import BaseService from "../Base/BaseService";

class ProductService{
    constructor(){
        BaseService.getBaseURL()
        this.GET_PRODUCT = "product/getProduct"
        this.GET_ALL = "product/getAllProducts"
    }
    getAllProducts() {
        return axios.get(this.GET_ALL)
    }
    getProduct(input) {
        let data = {
            pid : input
        }
        return axios.post(this.GET_PRODUCT,data)
    }
}
export default ProductService = new ProductService();