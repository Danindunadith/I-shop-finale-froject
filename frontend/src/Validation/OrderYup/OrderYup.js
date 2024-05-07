import * as yup from 'yup';

class OrderYup {
    orderSchema = yup.object({
        homeAddress: yup.string().required(),
        postalCode: yup.number().required(),
        telephone: yup.string().required(),
        country: yup.string().oneOf(['srilanka', 'usa', 'uk', 'india']).required(),
        city: yup.string().oneOf(['kurunegala', 'colombo', 'kandy']).required(),
        cardName: yup.string().required(),
        cardNumber: yup.number().required(),
        cvc: yup.number().required(),
    });
}

export default new OrderYup();