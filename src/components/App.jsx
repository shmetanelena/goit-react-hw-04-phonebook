import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import { useState, useMemo } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts.`);
      return false;
    }
    const contact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, contact]);
    return true;
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = useMemo(() => {
    if (filter.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  return (
    <div className={styles.section}>
      <div className={styles.box}>
        <div className={styles.box}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
        </div>

        <div className={styles.box}>
          <h3>Find contacts by name:</h3>
          <Filter
            onChange={e => setFilter(e.currentTarget.value)}
            value={filter}
          />
        </div>

        <div className={styles.box}>
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};
