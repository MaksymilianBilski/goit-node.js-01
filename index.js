// const argv = require("yargs").argv;
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

const { addContact, listContacts, getContactById, removeContact } = contacts;

const usedID = Array.from(listContacts()).map((el) => el.id);
const randomID = () => {
  const id = Math.random() * 100;
  if (usedID.includes(id.toFixed(0))) {
    id = Math.random() * 100;
  }
  return id.toFixed(0);
};

function invokeAction(argv) {
  const { action, id, name, email, phone } = argv;
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
