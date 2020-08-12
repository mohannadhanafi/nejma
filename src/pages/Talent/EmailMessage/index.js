import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import './index.scss';
import { useSelector } from 'react-redux';
import { selectUser } from "store/selectors";

export default function VerifyEmailMessage() {
    const { t } = useTranslation();
    const { state } = useLocation();
    const { approved } = useSelector(selectUser);
    return (
        <main className='verify-wrapper' style={{ minHeight: '537px' }}>
            <section className='verify-section'>
                <div className='verify-email-card-section-wrapper thank-you-card'>
                    <div className='content--container thank-down-message'>
                        <h1>{t('verify.thank')}!</h1>
                        <p>
                            {state.waitApprove && t('verify.notApproved')}
                            {state.waitComplete && t('verify.notCompleted')}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
