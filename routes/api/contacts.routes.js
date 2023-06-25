const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts.controller");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact.model");

router.get("/", ctrl.geAllContacts);

router.get("/:id", isValidId, ctrl.getOneContact);

router.post(
  "/",
  validateBody(schemas.addSchema, `missing fields`),
  ctrl.postContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, `missing field favorite`),
  ctrl.updateContactStatus
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema, `missing fields`),
  ctrl.updateContact
);

router.delete("/:id", isValidId, ctrl.deleteContact);

module.exports = router;
