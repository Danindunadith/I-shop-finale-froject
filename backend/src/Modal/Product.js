import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const urlPic = [
    "https://media.gamestop.com/i/gamestop/ps5-content1/PS5%20console%20and%20controller.webp",
    "https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-US_3295c924-7c21-417d-870c-32bee7f1e310.jpg?v=1695861436",
    "https://helios-i.mashable.com/imagery/articles/05dlTp4hFqQv1HZE19rSRE2/hero-image.fill.size_1200x900.v1695053686.jpg",
    "https://www.computerbiz.co.za/wp-content/uploads/2022/07/1-11.png",
    "https://rog.asus.com/media/1546851909965.jpg",
    "https://i.pcmag.com/imagery/roundups/05UuGuaC1DeBtIUmi0vstl3-15..v1674505590.jpg"
]
const getRandomDefaultpic = () => {
    const randomIndex = Math.floor(Math.random() * urlPic.length);
    return urlPic[randomIndex];
}
const productSchema = new mongoose.Schema(
    {
        pid: {
            type: String,
            default: uuidv4,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            default: getRandomDefaultpic
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        stocks: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    {
        versionKey: '__v',
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)


const Product = mongoose.model('Product', productSchema);
export default Product;