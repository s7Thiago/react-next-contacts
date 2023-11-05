"use client"
import { List } from '@/components/Index'
import { HomeForm } from './HomeForm/page'
import { useState } from 'react';
import { Contact } from '@/models/Contact';

export default function Home() {

  const [contacts, updateContacts] = useState([] as Contact[]);

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

      <HomeForm contacts={contacts} updateContacts={updateContacts}/>
      <List contacts={contacts} updateContacts={updateContacts} />

    </main>
  )
}
