const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")
const {signupForEvent}= require("../controllers/eventController")

router.get("/manual", eventController.getManualEvents)
router.post("/manual", eventController.createManualEvent)
router.delete("/manual/:id", eventController.deleteManualEvent)

router.get("/external", eventController.getExternalEvents)
router.get("/:id", eventController.getSingleExternalEvent)
router.post("/signup", signupForEvent)

module.exports= router;