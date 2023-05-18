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
  return (
    <AppWrapper>
      <PhoneBookSection>
        <Title>PhoneBook</Title>
        <ContactForm />
      </PhoneBookSection>

      <ContactSection>
        <Title>Contacts</Title>
        <Filter />
        <ContactsList />
      </ContactSection>
    </AppWrapper>
  );
}
