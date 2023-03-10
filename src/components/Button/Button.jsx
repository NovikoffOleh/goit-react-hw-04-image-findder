import PropTypes from 'prop-types';
import React from 'react';
import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Шукати ще
    </button>
  );
}

Button.propTypes = { onClick: PropTypes.func.isRequired };
