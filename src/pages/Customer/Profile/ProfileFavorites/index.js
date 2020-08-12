import React from 'react';
import TalentCard from 'components/TalentCard';
import './index.scss';
import { useTranslation } from 'react-i18next';

const ProfileFavorites = (props) => {
  const { t } = useTranslation();
  const { favorites } = props;
  return (
    <div
      className={`profile--favorites ${
        favorites.length === 0 && 'profile--favorites-no-talents'
        }`}
    >
      {favorites.length ? (
        favorites.map((item) => (
          <TalentCard
            id={item.id}
            image={item.picUrl}
            nameEn={item.nameEng}
            nameAr={item.nameAr || item.nameEng}
            categoryEn={
              item.category ? item.category.categoryName : item.categoryName
            }
            categoryAr={
              item.category ? item.category.categoryNameAr : item.categoryNameAr
            }
            price={item.initPrice}
            className='favorites--customer'
          />
        ))
      ) : (
          <div className='no-favorites-talents'>
            <p> {t('talent.no-talents')}</p>
          </div>
        )}
    </div>
  );
};

export default ProfileFavorites;
