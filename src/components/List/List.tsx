"use client"
import { Contact } from "@/models/Contact";
import { ContactLocalStorageRepository } from "@/repository/ContactLocalStorageRepository";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CustomCard, ListItem, LoadingSpinner } from "../Index";
import { v4 as uuidv4 } from 'uuid';


export type ListProps = {
    className?: string;
    contactsState: {
        contacts: Contact[];
        updateContacts: (contacts: Contact[]) => void;
    };
    selectedContactState: {
        selectedContact: Contact;
        updateSelectedContact: (contact: Contact) => void;

    }
};

export const List = ({ contactsState, selectedContactState, className }: ListProps) => {

    const repository = ContactLocalStorageRepository.INSTANCE;

    const [isLoading, notifyLoading] = useState(true);

    // Carregando a lista inicial
    useEffect(() => {

        // Espera 4 segundos antes de começar a carregar
        setTimeout(() => {
            notifyLoading(false);
        }, 4000);

        const getData = async () => {
            notifyLoading(true);

            const response = await fetch('https://private-9d65b3-tinnova.apiary-mock.com/users');
            const data = await response.json();

            // Setando os ids como o nome + email + cpf
            data.forEach((contact: Contact) => {
                // gera um UUID-v4
                contact.id = uuidv4();

                // Adiciona no repositório local
                repository.createContact(contact);
            });

            repository.getContacts().then((contacts) => {
                contactsState.updateContacts(contacts);
            });

            notifyLoading(false);
        }

        getData();

    }, []);

    return (
        <CustomCard
            className={clsx(`
                transition-all
                duration-700
                delay-200
                w-[500px]
                h-50
                bg-white
                text-black
                ${className}
        `, {
                "h-auto": isLoading,
                "animate-pulse": isLoading
            })}>

<h1
            className='text-sm font-bold text-gray-500'
            >Cadastrados</h1>

            <br />

            {
                (contactsState.contacts.length <= 0) && !isLoading ?
                    <h2 className="text-gray-300 select-none" >Não há nenhum registro...</h2> :
                    null
            }

            {isLoading ?

                <div className="flex items-start justify-start">
                    <LoadingSpinner />
                    <br />
                    <h2 className="text-gray-300 select-none" >Não há nenhum registro...</h2>
                </div>
                :

                <div className={clsx(`
                transition-all duration-700
                `, {})}>
                    {contactsState.contacts.map((contact) => {
                        return (
                            <div key={contact.id}>
                                <ListItem
                                    contact={contact}
                                    contactsState={contactsState}
                                    totalItems={contactsState.contacts.length}
                                    selectedContactState={selectedContactState}
                                    index={contactsState.contacts.indexOf(contact)}
                                />
                            </div>
                        )
                    })}
                </div>
            }
        </CustomCard>
    );
}