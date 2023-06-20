const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrl.geAllContacts);

router.get("/:id", ctrl.getOneContact);

router.post("/", validateBody(addSchema), ctrl.postContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(addSchema), ctrl.putContact);

module.exports = router;
