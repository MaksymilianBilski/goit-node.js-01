const fs = require("fs").promises;
const path = require("path");
const contacts = require("./db/contacts.json");
const contactsPath = path.dirname("./db/contacts.json");

const addContact = async (id, name, email, phone) => {
  const newContact = { id, name, email, phone };
  const updatedContacts = contacts;
  updatedContacts.push(newContact);
  await fs.writeFile(
    contactsPath + "/contacts.json",
    JSON.stringify(updatedContacts)
  );
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const parsedContacts = JSON.parse(contacts);
  const tabIndex = parsedContacts.findIndex((el) => el.id === id.toString());
  parsedContacts.splice(tabIndex, 1);
  await fs.writeFile(
    contactsPath + "/contacts.json",
    JSON.stringify(parsedContacts)
  );
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const searchedContact = JSON.parse(contacts).find((el) => {
    return el.id === id.toString();
  });
  console.log(searchedContact);
  return searchedContact;
};

const listContacts = async () => {
  const response = await fs.readFile(contactsPath + "/contacts.json");
  return response.toString();
};

module.exports = { addContact, listContacts, getContactById, removeContact };
