import React from 'react'
import './index.scss'
import { Rate } from 'antd';
import moment from 'moment';

export default function ReviewUnit({ hadnleMultiLang, review }) {
  return (
    <div className="review-whole-unit">
      <div className="review-card-wrapper">
        <div
          className={hadnleMultiLang("avatar")}
          style={{ backgroundImage: `url(${review.customer.picUrl})` || null }}
        />
        <div className="review-data">
          <div className="left-side">
            <div className="top-data">
              <div className={hadnleMultiLang("rate-stars")}>
                <h5>{review.rating}</h5>
                <Rate
                  style={{ color: '#fa6914', fontSize: '15px' }}
                  value={review.rating}
                  disabled
                />
              </div>

              <div>{moment(review.reviewData).fromNow()}</div>
            </div>
            <h5 className="review-tag">@{review.customer.name}</h5>
          </div>
        </div>
      </div>
      <p className={hadnleMultiLang("review-description")}>
        {review.review}
      </p>
    </div>
  )
}
