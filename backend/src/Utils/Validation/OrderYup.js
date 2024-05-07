import * as yup from 'yup';

class OrderYup {
    createOrderSchema = yup.object({
        orderedBy: yup.string().required(),
        product: yup.string().required(),

        homeAddress: yup.string().required(),
        postalCode: yup.string().required(),
        telephone: yup.string().required(),
        country: yup.string().oneOf(['srilanka', 'usa', 'uk', 'india']).required(),
        city: yup.string().oneOf(['kurunegala', 'colombo', 'kandy']).required(),

        cardNumber: yup.number().required(),
        cardName: yup.string().required(),
        cvc: yup.number().required()
    });

    getOrderSchema = yup.object({
        id: yup.string().required()
    });

    deleteOrder = yup.object({
        oid: yup.string().required()
    });
}

export default OrderYup = new OrderYup;