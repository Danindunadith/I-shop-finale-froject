import User from "../Modal/User.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/Token/generateToken.js";


class AuthController {

    //create SignUp
    signUp = async (req, res) => {
        const { name, email, password, role, picUrl } = req.body;
        try {
            const existing = await User.findOne({ email })
            if (existing) return response(res, 403, ResTypes.errors.user_exists)

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ name, email, password: hashedPassword, role, picUrl })
            const createdUser = await user.save()
            if(createdUser) return response(res,201,ResTypes.successMessages.user_created)
        } catch (error) {
            return response(res, 500, error)
        }
    }
    //create SignIn
    signIn = async (req, res) => {
        const { email, password, role } = req.body;

        try {
            const user = await User.findOne({ email, role })
            if (!user) {
                return response(res, 404, ResTypes.errors.no_user);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response(res, 403, ResTypes.errors.invalid_password)
            }
            const token = generateToken(user)
            return response(res, 201, { email,token, role ,...ResTypes.successMessages.login_successful })
        } catch (error) {
            return response(res, 500, error)
        }
    }
}

export default AuthController = new AuthController()