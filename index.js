const argv = require("yargs").argv;
const contacts = require("./contacts");
console.log(argv);

const { addContact, listContacts, getContactById, removeContact } = contacts;

const usedID = Array.from(listContacts()).map((el) => el.id);
const randomID = () => {
  const id = Math.random() * 100;
  if (usedID.includes(id.toFixed(0))) {
    id = Math.random() * 100;
  }
  return id.toFixed(0);
};

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      addContact(randomID(), name, email, phone);
      break;
    case "remove":
      removeContact(id);
      break;
    case "get":
      getContactById(id);
      break;
    case "list":
      listContacts();
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
