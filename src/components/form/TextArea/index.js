import React from 'react';
import './index.scss';

export default function TextField(props) {
  const { label, onChange, value, ...rest } = props;
  return (
    <div className='form-input'>
      <label className='form-label' htmlFor='name'>
        {label}
      </label>
      <br />
      <textarea
        className='form-text-field'
        type='text'
        id='name'
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
