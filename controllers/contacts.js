const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const geAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};
const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};
const postContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};
const putContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};
module.exports = {
  geAllContacts: ctrlWrapper(geAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
};
