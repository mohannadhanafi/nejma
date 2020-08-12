import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Rate } from 'antd';

import './index.scss';
import ReviewUnit from './ReviewUnit/index';
import { API_CALL } from 'store/constants';
import { useParams } from 'react-router-dom';
import { Loading } from 'components';
import rounded from 'utils/roundNumber';


const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { language } = i18n
  const [overallRating, setOverAllRating] = useState();
  const [reviewsCount, setReviewsCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReveiews] = useState([]);

  useEffect(() => {
    const onSuccess = (response) => {
      const { data: { overallRating, reviews, approvedReviewsCount } } = response;
      setOverAllRating(overallRating);
      setReveiews(reviews)
      setReviewsCount(approvedReviewsCount)
      setIsLoading(false)
    };
    const onFailure = (err) => {
      setOverAllRating(0);
      setReveiews([])
      setReviewsCount(0)
      setIsLoading(false)
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: 'GET',
        url: `/talent/reviews/${id}`,
        onSuccess,
        onFailure,
      },
    });
  }, [])

  const hadnleMultiLang = (className) => {
    let reformattedName = className
    if (language === 'ar')
      reformattedName = `${reformattedName} ar`
    return reformattedName
  }

  if (isLoading) return <Loading />;
  return (
    <div className="reviews--page">
      <div className="container ">
        <div className="reviews--wrapper">
          <h2 className="reviews--page--heading">{t('reviewsPage.heading')}</h2>
          <div className="rate--span">
            <div className="rate--span--first">
              <h4 id={hadnleMultiLang("main-rate-value")} className={hadnleMultiLang("rate--value")}>
                {rounded(Number(overallRating))}{' '}</h4>
              <Rate
                style={{ color: '#fa6914', fontSize: '30px' }}
                value={Number(overallRating)}
                disabled
              />
            </div>
            <a>{reviewsCount} {t('reviews')}</a>
          </div>
          {reviews.length ? (reviews.map((review) => (
            <ReviewUnit key={review.id} review={review} hadnleMultiLang={hadnleMultiLang} />
          ))) : <h1>{t('reviewsPage.noReviews')}</h1>}
        </div>
      </div>
    </div>
  )
};

export default ReviewsPage;
