import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }, onSuccess) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
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
