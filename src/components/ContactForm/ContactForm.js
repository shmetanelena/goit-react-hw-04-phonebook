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
/*
const INITIAL_STATE = {
  name: '',
  number: '',
};

export class OldContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };
  nameInputId = nanoid();
  numberInputId = nanoid();

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handelSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit({ ...this.state })) {
      this.reset();
    }
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handelSubmit}>
        <div className={styles.box}>
          <div className={styles.box_name}>
            <label htmlFor={this.nameInputId}>
              Name
              <input
                className={styles.input_name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={this.handleChange}
                id={this.nameInputId}
              />
            </label>

            <label htmlFor={this.numberInputId}>
              Number
              <input
                className={styles.input_number}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={this.handleChange}
                id={this.numberInputId}
              />
            </label>
          </div>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}
*/
