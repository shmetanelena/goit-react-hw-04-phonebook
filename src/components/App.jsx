// import React, { Component } from 'react';
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
/*
export class OldApp extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }, onSuccess) => {
    const normalizedName = name.toLowerCase();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const contact = { id: nanoid(), name, number };
    this.setState(
      ({ contacts }) => ({
        contacts: [...contacts, contact],
      }),
      onSuccess()
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    if (filter.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={styles.section}>
        <div className={styles.box}>
          <div className={styles.box}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={this.addContact} />
          </div>

          <div className={styles.box}>
            <h3>Find contacts by name:</h3>
            <Filter onChange={this.changeFilter} value={filter} />
          </div>

          <div className={styles.box}>
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}
*/
