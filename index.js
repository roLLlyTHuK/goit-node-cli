import { program } from "commander";
//так як за замовченням в дз стояв імпорт commander через ES module , то ми використали імпорт ES module
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      console.table(await listContacts());
      break;

    case "get":
      // ... id
      console.log(" Contact by ID:>> ", await getContactById(id));
      break;

    case "add":
      // ... name email phone
      console.log("add Contact:>> ", await addContact(name, email, phone));
      break;

    case "remove":
      // ... id
      console.log("remove Contact:>> ", await removeContact(id));

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
