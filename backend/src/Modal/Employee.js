import mongoose from "mongoose";

const urlPic = [
    "https://avatars.githubusercontent.com/u/54225118?v=4",
    "https://avatars.githubusercontent.com/u/22358125?v=4",
    "https://avatars.githubusercontent.com/u/98579886?v=4",
    "https://avatars.githubusercontent.com/u/17646305?v=4"
]
const getRandomDefaultpic = () => {
    const randomIndex = Math.floor(Math.random() * urlPic.length);
    return urlPic[randomIndex];
}
const roleType = ['security', 'saleman','manager','employee']
const genderType = ['male', 'female']
const incrementType = ['bonus', 'worker','attendence']
const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required:true
        },
        salary: {
            type: Number,
            required:true
        },
        nic: {
            type: String,
            required: true,
            unique: true
        },
        photoUrl: {
            type: String,
            default: getRandomDefaultpic
        },
        role: {
            type: String,
            enum: roleType,
            default: 'employee',
            lowercase: true,
        },
        gender: {
            type: String,
            lowercase: true,
            enum: genderType,
            default: 'male',
            required:true
        },
        increment: {
            type: String,
            lowercase: true,
            enum: incrementType,
            default: 'bonus',
            required:true
        }
    },
    {
        versionKey: '__v',
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;