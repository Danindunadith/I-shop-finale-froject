import Repair from "../Modal/Repair.js";

class RepairController {
  getRepair = async (req, res, next) => {
    Repair.find()
      .then((response) => {
        res.json({ response });
      })
      .catch((error) => {
        res.json({ error });
      });
  };

  //const getRepairs = (req, res) => {
  //   const xrepairs = Repair.find()
  //   res.status(200).json(xrepairs)
  addRepair = async (req, res, next) => {
    const repair = await Repair.create({
      rid: req.body.rid,
      cid: req.body.cid,
      status: req.body.status,
      estDate: req.body.estDate,
      deviceType: req.body.deviceType,
      model: req.body.model,
      cDscrptn: req.body.cDscrptn,
      tDscrptn: req.body.tDscrptn,
      invoice: req.body.invoice,
      sDate: req.body.sDate,
    })
      .then((response) => {
        res.json({ response });
      })
      .catch((error) => {
        res.json({ error });
      });
  };

  updateRepair = async (req, res, next) => {
    const {
      rid,
      cid,
      status,
      estDate,
      deviceType,
      model,
      cDscrptn,
      tDscrptn,
      invoice,
      sDate,
    } = req.body;
    Repair.updateOne(
      { rid: rid },
      {
        $set: {
          cid: cid,
          status: status,
          estDate: estDate,
          deviceType: deviceType,
          model: model,
          cDscrptn: cDscrptn,
          tDscrptn: tDscrptn,
          invoice: invoice,
          sDate: sDate,
        },
      }
    )
      .then((response) => {
        res.json({ response });
      })
      .catch((error) => {
        res.json({ error });
      });
  };

  deleteRepair = async (req, res, next) => {
    //const id = req.body.id;
    //Repair.deleteOne({ id: id })
    const rid = req.body.rid;
    console.log(req.body.rid);
    Repair.deleteOne({ rid: rid })
      .then((response) => {
        res.json({ response });
      })
      .catch((error) => {
        res.json({ error });
      });
  };
}

export default RepairController = new RepairController();
