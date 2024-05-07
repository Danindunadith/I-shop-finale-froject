import response from "../Utils/ResponseHandler/ResponseHandler.js";


function validateScehma(schema){
    return async function(req,res,next){
        try {
            const body = req.body
            await schema.validate(body)
            next();
        } catch (error) {
            return response(res,400,{message:error.message})
        }
    }
}
export default validateScehma;