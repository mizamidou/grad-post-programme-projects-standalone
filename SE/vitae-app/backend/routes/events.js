const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")

router.get("/manual", eventController.getManualEvents)
router.post("/manual", eventController.createManualEvent)
router.delete("/manual", eventController.deleteManualEvent)

router.get("/external", eventController.getExternalEvents)
router.get("/:id", eventController.getSingleExternalEvent)

module.exports= router;