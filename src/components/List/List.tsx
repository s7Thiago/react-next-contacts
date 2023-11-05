"use client"
import { Contact } from "@/models/Contact";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Button/components/LoadingSpinner";
import { CustomCard, ListItem } from "../Index";
import { ContactLocalStorageRepository } from "@/repository/ContactLocalStorageRepository";


export type ListProps = {
    contacts: Contact[];
    updateContacts: (contacts: Contact[]) => void;
};

export const List = ({contacts, updateContacts} : ListProps) => {

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
                contact.id = "ID:" + contact.name + contact.email + contact.cpf;
                // Adiciona no repositório local
                repository.createContact(contact);
            });

            repository.getContacts().then((contacts) => {
                updateContacts(contacts);
            });

            notifyLoading(false);
        }

        getData();

    }, []);

    return (
        <CustomCard
            className={`
                transition-all
                w-[500px]
                h-auto
                bg-black
                bg-white
                text-black
        `}>

            {isLoading ?

                <div className="flex items-start justify-start">
                    <LoadingSpinner />
                    <br />
                    <h2 className="text-gray-300 select-none" >Não há nenhum registro...</h2>
                </div>
                :

                <div>
                    {contacts.map((contact) => {
                        return (
                            <div key={contact.id}>
                                <ListItem
                                    contact={contact}
                                    index={contacts.indexOf(contact)}
                                    totalItems={contacts.length}
                                />
                            </div>
                        )
                    })}
                </div>

            }

        </CustomCard>
    );
}