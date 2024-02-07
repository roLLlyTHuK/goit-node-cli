// contacts.js

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/* Розкоментуй і запиши значення*/
const contactsPath = path.join(process.cwd(), "db/contacts.json");
// console.log("contactsPath.toString() :>> ", contactsPath.toString());

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const removedContact = contacts.find((contact) => contact.id === contactId);
  if (removedContact) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
