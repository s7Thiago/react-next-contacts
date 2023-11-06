"use client"
import { List } from '@/components/Index';
import { Contact } from '@/models/Contact';
import { useState } from 'react';
import { HomeForm } from './HomeForm/page';

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

  return (
    <main className={`
      flex
      transition-all
      duration-500
      min-h-screen
      flex-row
      items-start
      justify-center
      p-24
      bg-[#f4f4f4]
    `}>

      <HomeForm contactsState={contactState} />
      <List contactsState={contactState} selectedContactState={selectedContactState} />

    </main>
  )
}
