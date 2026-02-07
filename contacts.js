import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "contacts.json");

export async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  return data;
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  const result = data.find(({ id }) => id == contactId);

  if (!result) return null;

  return result;
}

export async function removeContact(contactId) {
  //   ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  const idx = data.findIndex(({ id }) => id == contactId);
  if (idx === -1) return null;
  const newData = data.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, "  "));
  return newData[0];
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  const nevContact = {
    id: uuidv4(),
    name: name,
    email: String(email),
    phone: String(phone),
  };

  data.push(nevContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, "  "));
  return nevContact;
}
