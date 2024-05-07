import axios from "axios";
import BaseService from "../Base/BaseService";
import LocalStore from "../../Store/LocalStore";

class EmpService {
    constructor() {
        BaseService.getBaseURL();
        this.ADD_DELIVERY = "delivery/addDelivery";
        this.UPDATE_DELIVERY = "delivery/updateDelivery";
    }
    addDelivery(input) {
        let data = {
            oid: input,
            approvedBy: LocalStore.getToken().email,
        };
        return axios.post(this.ADD_DELIVERY, data, BaseService.getHeader());
    }

    updateDelivery(input) {
        let data = {
            oid: input.id,
            approvedBy: LocalStore.getToken().email,
            deliveryType:input.deliveryType
        };
        return axios.put(this.UPDATE_DELIVERY, data, BaseService.getHeader());
    }
}

export default EmpService = new EmpService();
