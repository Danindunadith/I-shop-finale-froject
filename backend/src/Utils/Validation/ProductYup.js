import yup from 'yup';

class ProductYup {
    getProductSchema = yup.object({
        pid: yup.string().required(),
    });

    getAllProductsSchema = yup.object({});

    createProductSchema = yup.object({
        name: yup.string().required(),
        price: yup.number().positive().required(),
        description: yup.string().min(10).required(),
        stocks: yup.string().required(),
        category: yup.string().required()
    });
}

export default ProductYup = new ProductYup();
