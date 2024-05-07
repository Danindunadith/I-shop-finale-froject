import axios from "axios";
import BaseService from "../Base/BaseService";

class NotificationService {
    constructor() {
        BaseService.getBaseURL()
        this.GET_NOTI = "notification/getAllNotificationOfUser"
        this.NOTI_DONE = "notification/update"
        this.DELETE_NOTI = "notification/delete"
    }
    getAllNotificationOfUser(input) {
        let data = {
            email: input
        }
        return axios.post(this.GET_NOTI, data,BaseService.getHeader())
    }
    makeNotiDone(input) {
        let data = {
            id: input,
            seen:true
        }
        return axios.put(this.NOTI_DONE,data,BaseService.getHeader())
    }
    deleteNoti(input) {
        let data = {
            nid: input
        };
        return axios.delete(this.DELETE_NOTI, { ...BaseService.getHeader(), data: data });
    }
}
export default NotificationService = new NotificationService();