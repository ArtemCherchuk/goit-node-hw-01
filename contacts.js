const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const writeContacts = async (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
};

const listContacts = async () => {
  const data = await readContacts();
  return data;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const findContact = contacts.find((item) => item.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1);
  writeContacts(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
