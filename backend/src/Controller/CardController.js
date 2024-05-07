import Card from "../Modal/Card.js";

const CardController = {
    async cardcreate(req, res) {
        try {
            const newCard = await Card.create(req.body);
            res.status(201).json(newCard);
        } catch (error) {
            res.status(500).json({ error: "Failed to add card report" });
        }
    }
};

export default CardController;