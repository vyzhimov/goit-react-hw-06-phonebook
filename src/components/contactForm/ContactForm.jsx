import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsList } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import { SlUserFollow } from 'react-icons/sl';
import Notiflix from 'notiflix';

import {
  Form,
  FormContactLable,
  FormContactInput,
  FormContactBtn,
} from './ContactForm.styled';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contactsList = useSelector(getContactsList);

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return '';
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contactsList.some(
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

    dispatch(addContact(contact));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormContactLable>
        Name
        <FormContactInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </FormContactLable>
      <FormContactLable>
        Number
        <FormContactInput
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </FormContactLable>
      <FormContactBtn type="submit">
        <SlUserFollow fontSize="large" />
        Add contact
      </FormContactBtn>
    </Form>
  );
}
