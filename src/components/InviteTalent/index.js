import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import './index.scss';

const InviteTalent = () => {
  const { t } = useTranslation()
  return (
    <div className="invite--talent--wrapper">
      <Row className="container invite--talent--wrapper__container">
        <Col span={12} className="content--text">
          <h3>{t('inviteTalent.firstHeading')}<br />{t('inviteTalent.secondHeading')}</h3>
          <p>{t('inviteTalent.firstParagraph')}<br />{t('inviteTalent.secondParagraph')}</p>
        </Col>
        <Col span={12} className="form">
          <input
            placeholder={t('inviteTalent.placeholder')}
            className="invite--talent--submit--input"
          />
          <button
            className='main-btn form-submit-btn invite--talent--submit--btn'
            type='submit'
          >
            {t('inviteTalent.send')}
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default InviteTalent;
