import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';

export default function HowItWork(props) {
  const { t, i18n } = useTranslation();
  return (
    // <main style={{ width: '100%' }}>
    <section className='how-it-works-section main-background-color'>
      {/* <div class='how-it-works-wrapper'> */}
      <div className='container'>
        <div
          className={`how-it-works-wrapper__container ${
            i18n.language === 'ar' ? 'how-it-works-wrapper__container__ar' : ''
          }`}
        >
          <h2 className='how-it-works-title'>
            {t('home.how-it')} {t('home.works')}
          </h2>

          <p className='how-it-works-description'>
            {t('home.how-it-work-para')}
          </p>

          <div className='how-it-works-steps-wrapper'>
            <div className='step-wrapper'>
              <div className='star-icon-wrapper'>
                <span className='step-number number-one'>1</span>
                <img
                  alt=''
                  className='star-icon'
                  src={require('assets/starIcon.png')}
                />
              </div>

              <h2 className='step-title'>{t('home.find-celebrity')}</h2>

              <p className='step-description'>
                {t('home.find-celebrity-para')}
              </p>
            </div>

            <div className='step-wrapper'>
              <div className='email-icon-wrapper'>
                <span className='step-number number-two'>2</span>
                <img
                  alt=''
                  className='email-icon'
                  src={require('assets/emailIcon.png')}
                />
              </div>

              <h2 className='step-title'>{t('home.send-your-request')}</h2>

              <p className='step-description'>
                {t('home.send-your-request-para')}
              </p>
            </div>

            <div className='step-wrapper'>
              <div className='youtube-icon-wrapper'>
                <span className='step-number number-three'>3</span>
                <img
                  alt=''
                  className='youtube-icon'
                  src={require('assets/youtubeIcon.png')}
                />
              </div>

              <h2 className='step-title'> {t('home.receive-your-video')}</h2>

              <p className='step-description'>
                {t('home.receive-your-video-para')}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
    // </main>
  );
}
/**
 *
 *
 *
    <section class='how-it-works-section main-background-color '>
      <div class='how-it-works-wrapper container'>
        <div class='boxed'>
          <h2 class='how-it-works-title'>{t('home.how-it-work')}</h2>

          <p class='how-it-works-description'>{t('home.how-it-work-para')}</p>

          <div class='how-it-works-steps-wrapper'>
            <div class='step-wrapper'>
              <div class='star-icon-wrapper'>
                <span class='step-number number-one'>1</span>
                <img
                  alt=''
                  class='star-icon'
                  src={require('../../../assets/how-it-work-step-1-img-1.png')}
                  width='100'
                  style={{ margin: '0 10px' }}
                />
                <img
                  alt=''
                  class='star-icon'
                  src={require('../../../assets/how-it-work-step-1-img-2.png')}
                  width='100'
                />
              </div>

              <h2 class='step-title'>{t('home.find-celebrity')}</h2>
            </div>

            <div class='step-wrapper'>
              <div class='email-icon-wrapper'>
                <span class='step-number number-two'>2</span>
                <img
                  alt=''
                  class='email-icon'
                  src={require('../../../assets/how-it-work-step-2.png')}
                  width='200'
                />
              </div>

              <h2 class='step-title'>{t('home.send-your-request')}</h2>
            </div>

            <div class='step-wrapper'>
              <div class='youtube-icon-wrapper'>
                <span class='step-number number-three'>3</span>
                <img
                  alt=''
                  class='youtube-icon'
                  src={require('../../../assets/how-it-work-step-3.png')}
                  width={125}
                />
              </div>

              <h2 class='step-title'>{t('home.receive-your-video')}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
 */
