import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactForm from 'components/contactForm';
import ContactsList from 'components/contactsList';
import Filter from 'components/filter';
import {
  AppWrapper,
  Title,
  PhoneBookSection,
  ContactSection,
} from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      Notiflix.Report.failure(
        'Sorry!',
        `${contact.name} is already in contacts`,
        'close',
        { width: '220px' }
      );
      return;
    }

    setContacts(prev => [...prev, contact]);
  };

  const onDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normilizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(normilizedFilter) ||
      contact.number.toLowerCase().includes(normilizedFilter)
  );

  return (
    <AppWrapper>
      <PhoneBookSection>
        <Title>PhoneBook</Title>
        <ContactForm onSubmit={addContact} />
      </PhoneBookSection>

      <ContactSection>
        <Title>Contacts</Title>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactsList
          contacts={filteredContacts}
          deleteContact={onDeleteContact}
        />
      </ContactSection>
    </AppWrapper>
  );
}
