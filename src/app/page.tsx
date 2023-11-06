"use client"
import { EditForm, List } from '@/components/Index';
import { Contact } from '@/models/Contact';
import { useState } from 'react';
import { HomeForm } from './HomeForm/page';
import clsx from 'clsx';

export default function Home() {

  const [contacts, updateContacts] = useState([] as Contact[]);
  const [selectedContact, updateSelectedContact] = useState({} as Contact);

  // Estado global da lista de contatos que é compartilhado entre os componentes mais abaixo
  const contactState = {
    contacts,
    updateContacts
  }

  // Estado global do contato selecionado pode ser compartilhado entre os componentes mais abaixo
  const selectedContactState = {
    selectedContact,
    updateSelectedContact
  }

  const editingStyle = clsx(`
    transition-all duration-500
    bg-gray-400
    opacity-100
    `, {
    "opacity-20": selectedContact.id,
    "bg-transparent": selectedContact.id,
    "pointer-events-none": selectedContact.id,
    "blur-lg": selectedContact.id,
  });

  return (
    <main className={`
      flex
      transition-all
      duration-500
      min-h-screen
      flex-row
      pt-10
      items-start
      justify-center
      bg-[#f4f4f4]
      relative
    `}>
      <HomeForm className={clsx(`
      ml-[25%]
      ${editingStyle}
      `, {
        "-ml-[500px]": selectedContact.id
      })} contactsState={contactState} />

      <List className={editingStyle} contactsState={contactState} selectedContactState={selectedContactState} />
      <EditForm className={`z-40`} contactsState={contactState} selectedContactState={selectedContactState} />

    </main>
  )
}
