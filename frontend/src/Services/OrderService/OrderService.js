import axios from "axios";
import BaseService from "../Base/BaseService";

class OrderService {
    constructor() {
        BaseService.getBaseURL()
        this.GET_order = "order/getOrder"
        this.GET_ALL = "order/getOrders"
        this.ADD_ORDER = "order/addOrder"
        this.DELETE_ORDER="order/deleteOrder"
    }
    getAllOrders() {
        return axios.get(this.GET_ALL)
    }
    getOrder(input) {
        let data = {
            pid: input.pid
        }
        return axios.post(this.GET_order, data)
    }
    addOrder(input) {
        let data = {
            orderedBy: input.email,
            product: input.pid,
            homeAddress: input.homeAddress,
            postalCode: input.postalCode,
            street: input.street,
            telephone: input.telephone,
            country: input.country,
            city: input.city,
            cardName: input.cardName,
            cardNumber: input.cardNumber,
            cvc: input.cvc
        };
        return axios.post(this.ADD_ORDER, data,BaseService.getHeader())
    }
    deleteOrder(input) {
        let data = {
            oid: input
        };
        return axios.delete(this.DELETE_ORDER, { ...BaseService.getHeader(), data: data });
    }
}
export default OrderService = new OrderService();