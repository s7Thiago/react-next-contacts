import { Contact, contactsEquals } from "@/models/Contact";
import { IContactRepository } from "./ContactRepositoryBase";
import { LocalStorageConstants } from "@/constants/LocalStorageRefs";
import { v4 as uuidv4 } from 'uuid';

export class ContactLocalStorageRepository implements IContactRepository {

    static get INSTANCE(): IContactRepository {
        return new ContactLocalStorageRepository();
    }

    createContact(contact: Contact): Promise<Contact> {
        // Tenta obter a lista de contatos do LocalStorage
        const contacts = localStorage.getItem(LocalStorageConstants.CONTACTS);

        // Se não existir, cria uma lista vazia
        let contactsList: Contact[] = [];
        if (contacts) {
            // Se existir, converte a string para um array de objetos
            contactsList = JSON.parse(contacts);

            // Cria um id para o contato
            contact.id = uuidv4();

            // Se o contato já existir, retorna, ignora o cadastro
            if (contactsList.find(c => contactsEquals(c, contact))) {
                return new Promise((resolve, reject) => {
                    reject();
                });
            }

            // Adiciona o contato na lista
            contactsList.push(contact);

        } else {
            localStorage.setItem(LocalStorageConstants.CONTACTS, JSON.stringify(contactsList));
        }

        return new Promise((resolve, reject) => {

            // Se o contato já existir, retorna, ignora o cadastro
            if (contactsList.find(c => c.id === contact.id)) {
                reject();
            }

            // Salva a lista no LocalStorage
            localStorage.setItem(LocalStorageConstants.CONTACTS, JSON.stringify(contactsList));

            // Retorna o contato criado
            resolve(contact);
        });
    }

    getContactById(id: string): Promise<Contact> {
        // Tenta obter a lista de contatos do LocalStorage
        const contacts = localStorage.getItem(LocalStorageConstants.CONTACTS);

        // Se vierem dados, tenta encontrar o contato pelo id
        if (contacts) {
            const contactsList: Contact[] = JSON.parse(contacts);
            const contact = contactsList.find(c => c.id === id);
            if (contact) {
                return new Promise((resolve, reject) => {
                    resolve(contact);
                });
            }
        }
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    getContacts(): Promise<Contact[]> {
        return new Promise((resolve, reject) => {
            // Tenta obter a lista de contatos do LocalStorage
            const contacts = localStorage.getItem(LocalStorageConstants.CONTACTS);

            // Se vierem dados, retorna a lista de contatos
            if (contacts) {
                resolve(JSON.parse(contacts));
            } else {
                reject();
            }
        });
    }

    updateContact(contact: Contact): Promise<Contact> {

        // Tenta obter a lista de contatos do LocalStorage
        const contacts = localStorage.getItem(LocalStorageConstants.CONTACTS);

        // Se vierem dados, tenta encontrar o contato pelo id
        if (contacts) {
            this.getContactById(contact.id!).then((contactToUpdate) => {
                const contactsList: Contact[] = JSON.parse(contacts);
                const index = contactsList.findIndex(c => c.id === contact.id);
                if (index >= 0) {
                    contactsList[index] = contact;
                    localStorage.setItem(LocalStorageConstants.CONTACTS, JSON.stringify(contactsList));
                }
            });
        }

        return new Promise((resolve, reject) => {
            resolve(contact);
        });
    }

    deleteContact(contact: Contact): Promise<void> {
        // Tenta obter a lista de contatos do LocalStorage
        const contacts = localStorage.getItem(LocalStorageConstants.CONTACTS);

        // Se vierem dados, tenta encontrar o contato pelo id
        if (contacts) {
            this.getContactById(contact.id!).then((contactToDelete) => {
                const contactsList: Contact[] = JSON.parse(contacts);
                const index = contactsList.findIndex(c => c.id === contact.id);
                if (index >= 0) {

                    // Remove o contato da lista
                    contactsList.splice(index, 1)

                    localStorage.setItem(LocalStorageConstants.CONTACTS, JSON.stringify(contactsList));
                }
            });
        }

        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}