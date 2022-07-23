import PropTypes from 'prop-types';
import styles from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <div className={styles.box}>
    <input
      type="text"
      className={styles.input}
      onChange={onChange}
      value={value}
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
