export type Contact = {
    id?: string,
    name: string,
    email: string,
    phone: string,
    cpf: string,
};

export const contactsEquals = (contact1: Contact, contact2: Contact) => {
    return contact1.name === contact2.name
        && contact1.email === contact2.email
        && contact1.phone === contact2.phone
        && contact1.cpf === contact2.cpf;
}