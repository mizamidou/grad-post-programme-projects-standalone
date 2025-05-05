const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")
const {signupForEvent}= require("../controllers/eventController")

router.get("/manual", eventController.getManualEvents)
router.post("/manual", eventController.createManualEvent)
router.get("/manual/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: "Manual event not found" });
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: "Error fetching manual event", error: err.message });
    }
  });
router.delete("/manual/:id", eventController.deleteManualEvent)

router.get("/external", eventController.getExternalEvents)
router.get("/combined", eventController.getCombinedEvents)

router.post("/signup", signupForEvent)
router.get("/:id", eventController.getSingleExternalEvent)

module.exports= router;