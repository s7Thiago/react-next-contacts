import { Contact } from "@/models/Contact";

export interface IContactRepository {
    createContact(contact: Contact): Promise<Contact>;
    getContactById(id: string): Promise<Contact>;
    getContacts(): Promise<Contact[]>;
    updateContact(contact: Contact): Promise<Contact>;
    deleteContact(contact: Contact): Promise<void>;
}