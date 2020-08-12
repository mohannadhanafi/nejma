import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

import celeb1 from '../../assets/celeb3.png';

import './index.scss';

const TalentCard = ({
  id,
  image,
  price,
  nameEn,
  nameAr,
  categoryEn,
  categoryAr,
  className,
  category,
  ...rest
}) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`category-thumbnail-wrapper ${className} ${
        i18n.language === 'ar' ? 'category-thumbnail-wrapper__ar' : ''
      }`}
    >
      <Link
        to={`/talent/${categoryEn}/${nameEn}/${id}`}
        className='celebrity-link'
      >
        <div
          className='celebrity-image-wrapper'
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <p className='price-tag'>$ {price}</p>
        </div>
        <div className='celebrity-details'>
          <h2 className='celebrity-name'>
            {i18n.language === 'ar' ? nameAr : nameEn}
          </h2>
          <p class='celebrity-occupation'>
            {i18n.language === 'ar' ? categoryAr : categoryEn}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TalentCard;
