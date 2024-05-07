import Jwt  from "jsonwebtoken";
import User from "../Modal/User.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";

const validateToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return response(res,401,ResTypes.errors.missing_token)
    }
    const token = authHeader.split(" ")[1];
    Jwt.verify(token, process.env.SECRET, async (err, decode) => {
        if (err) {
            return response(res,401,err)
        }
        const user = await User.findOne({ _id: decode.id })
        if (!user) {
            return response(res,401,ResTypes.errors.no_user)
        }
        req.user = user
        next();
    })
}
export default validateToken