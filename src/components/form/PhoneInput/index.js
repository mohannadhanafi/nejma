import React from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInputReact from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import './index.scss';

export default function PhoneInput(props) {
  const { t, i18n } = useTranslation();
  const { label, onChange, value, type, showForgetPassword, ...rest } = props;
  return (
    <div className='form-input'>
      {label && (
        <>
          <label
            className='form-label'
            style={{
              textAlign: i18n.language === 'en' ? 'left' : 'right',
              display: 'block',
            }}
            htmlFor='name'
          >
            {label}
          </label>
          <PhoneInputReact
            flags={flags}
            placeholder='Enter phone number'
            className={`form-field mobile-input ${
              i18n.language === 'en' ? 'mobile-input-en' : 'mobile-input-ar'
            }`}
            {...props}
          />
        </>
      )}
    </div>
  );
}
