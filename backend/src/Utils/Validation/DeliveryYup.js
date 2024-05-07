import * as yup from 'yup';

class DeliveryYup {
    addDelivery = yup.object({
        oid: yup.string().required(),
        approvedBy: yup.string().required(),
    });
    updateDelivery = yup.object({
        oid: yup.string().required(),
        approvedBy: yup.string().optional(),
        deliveryType:yup.string().oneOf(['standard', 'express']).required()
    });
}

const deliveryYup = new DeliveryYup();
export default deliveryYup;
