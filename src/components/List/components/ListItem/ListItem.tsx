"use client";

import { Contact } from "@/models/Contact";
import { ContactLocalStorageRepository } from "@/repository/ContactLocalStorageRepository";
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { IcoButton } from "./components/IconButton";

export type ListItemProps = {
    contact: Contact;
    index: number;
    totalItems: number;
    contactsState: {
        contacts: Contact[];
        updateContacts: (contacts: Contact[]) => void;
    };
    selectedContactState: {
        selectedContact: Contact;
        updateSelectedContact: (contact: Contact) => void;

    };
}

export const ListItem = ({
    contact,
    index,
    totalItems,
    contactsState,
    selectedContactState }: ListItemProps) => {

    const repository = ContactLocalStorageRepository.INSTANCE;

    return (
        <div className={clsx(
            `
            flex
            gap-4
            `, {})}>

            <div className="pr-10 flex">

                <div className="bg-transparent">
                    <h2 className="font-semibold">{contact.name}</h2>
                    <h2 className="text-gray-400">{contact.email}</h2>

                    {/* Horizontal row */}
                    {totalItems - 1 !== index ?
                        <div>
                            <p />
                            <div className="h-[0.5px] bg-gray-200 w-[350px] mt-5 mb-5"></div>
                            <p />
                        </div> : <div>
                            <p />
                            <div className="h-[0.5px] bg-white w-[350px] mt-5 mb-5"></div>
                            <p />
                        </div>
                    }
                </div>


                <div className="flex gap-4">

                    {/* Botão editar */}
                    <IcoButton
                        icon={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => {
                            setTimeout(() => { }, 150);
                            selectedContactState.updateSelectedContact(contact);
                        }}
                    />

                    {/* Botão deletar */}
                    <IcoButton
                        className="bg-input-invalid-border"
                        icon={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => {
                            console.log("Deletando contato: " + contact.name);

                            selectedContactState.updateSelectedContact(contact);
                            repository.deleteContact(contact);

                            setTimeout(() => {
                                repository.getContacts().then((contacts) => {
                                    contactsState.updateContacts(contacts);
                                });
                            }, 50);

                            selectedContactState.updateSelectedContact({} as Contact);
                        }}
                    />

                </div>
            </div>


        </div>
    );

}