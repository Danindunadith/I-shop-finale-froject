import Payment from "../Modal/Payment.js"; 

class PaymentController {

    // Create payment
    pcreate = async (req, res) => {
        try {
            const paymentData = new Payment(req.body);

            if (!paymentData) {
                return res.status(404).json({ msg: "Payment data not found" });
            }

            const savedData = await paymentData.save();
            res.status(200).json(savedData);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };


     //Get All Stocks
  pgetAll = async (req, res) => {
    try {
      const paymentData = await Payment.find();
      if (!paymentData) {
        return res.status(404).json({ msg: "Payment data not found" });
      }
      res.status(200).json(paymentData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  //DeletePayment
  pdelete = async (req, res) => {
    try {
      const id = req.body.id;
      const paymentExist = await Payment.findById(id);
      if (!paymentExist) {
        return res.status(404).json({ msg: "Stock not found" });
      }
      await Payment.findByIdAndDelete(id);
      res.status(200).json({ msg: "Stock deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

    //Get Payment
    pgetOne = async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id)
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
          return res.status(404).json({ msg: "Payment not found" });
        }
        res.status(200).json(paymentExist);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    };
  
    //Update Payment
    pupdate = async (req, res) => {
      try {
        const id = req.params.id;
        const { reportName, reportType, date, amount } = req.body;
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
          return res.status(401).json({ msg: "Payment not found" });
        }
        const updatedData = await Payment.updateOne(
          { _id: id }, // Query for the document you want to update
          { $set: { reportName, reportType, date, amount } } // Specify the changes you want to make
        );
        res.status(200).json({ msg: "Payment updated successfully" });
      } catch (error) {
        res.status(500).json({ error : "Test" });
      }
    };
  






}

export default new PaymentController(); // Instantiates the controller and exports it
