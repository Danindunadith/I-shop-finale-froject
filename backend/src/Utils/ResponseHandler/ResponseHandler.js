import HttpType from "./HttpType.js";

const response = (res, code, data) => {
    const status = HttpType.getStatus(code)
    const payLoad = {
        code,
        status,
        data
    }
    return res.status(code).json(payLoad);
}
export default response