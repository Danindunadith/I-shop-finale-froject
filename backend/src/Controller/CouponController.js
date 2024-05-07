import Stock from "../Modal/Coupon.js";

class CouponController{

    ccreate = async (req, res) => {
        try {
          const stockData = new Stock(req.body);
    
          if (!stockData) {
            return res.status(404).json({ msg: "Stock data not found" });
          }
    
          const savedData = await stockData.save();
          res.status(200).json(savedData);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      };


       //Get All Stocks
  cgetAll = async (req, res) => {
    try {
      const stockData = await Stock.find();
      if (!stockData) {
        return res.status(404).json({ msg: "Stock data not found" });
      }
      res.status(200).json(stockData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  //Get Stock
  cgetOne = async (req, res) => {
    try {
      const id = req.params.id;
      const stockExist = await Stock.findById(id);
      if (!stockExist) {
        return res.status(404).json({ msg: "Stock not found" });
      }
      res.status(200).json(stockExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  //Update Stock
  cupdate = async (req, res) => {
    try {
      const { id, brand, model, quatity } = req.body;
      const stockExist = await Stock.findById(id);
      if (!stockExist) {
        return res.status(401).json({ msg: "Stock not found" });
      }

      const updatedData = await Stock.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ msg: "Stock updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  //DeleteStock
  cdelete = async (req, res) => {
    try {
      const id = req.body.id;
      const stockExist = await Stock.findById(id);
      if (!stockExist) {
        return res.status(404).json({ msg: "Stock not found" });
      }
      await Stock.findByIdAndDelete(id);
      res.status(200).json({ msg: "Stock deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };



}


export default CouponController = new CouponController();