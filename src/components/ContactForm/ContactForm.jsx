import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = useRef();
  const numberInputId = useRef();

  useEffect(() => {
    nameInputId.current = nanoid();
    numberInputId.current = nanoid();
  }, []);

  const handelSubmit = e => {
    e.preventDefault();
    if (onSubmit({ name, number })) {
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className={styles.box}>
        <div className={styles.box_name}>
          <label htmlFor={nameInputId.current}>
            Name
            <input
              className={styles.input_name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              id={nameInputId.current}
            />
          </label>

          <label htmlFor={numberInputId.current}>
            Number
            <input
              className={styles.input_number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={e => setNumber(e.target.value)}
              id={numberInputId.current}
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
