import { useSelector, useDispatch } from 'react-redux';
import { getContactsList, getContactsFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import { RiDeleteBin3Line } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import { GiRotaryPhone } from 'react-icons/gi';

import {
  ContactList,
  ContactItem,
  ContactCard,
  DeleteBtn,
  ContactInfo,
} from './ContactList.styled';

export default function ContactsList() {
  const contactsList = useSelector(getContactsList);
  const filteredValue = useSelector(getContactsFilter);
  const dispatch = useDispatch();

  const filteredContacts = contactsList.filter(({ name }) =>
    name.toLowerCase().includes(filteredValue.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ContactList>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <ContactItem key={id}>
            <ContactCard>
              <ContactInfo>
                <BsPersonCircle />
                {name}
              </ContactInfo>
              <ContactInfo>
                <GiRotaryPhone />
                {number}
              </ContactInfo>
            </ContactCard>

            <DeleteBtn onClick={handleDeleteContact}>
              <RiDeleteBin3Line fill="currentColor" size="1.2rem" />
              Delete
            </DeleteBtn>
          </ContactItem>
        );
      })}
    </ContactList>
  );
}
