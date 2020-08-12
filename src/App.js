import React, { useEffect } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Row, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import Router from './router';
import { getSocialMedia } from './store/actions/social';
import { getCategories } from './store/actions/categories';
import { getLanguages } from './store/actions/languages';
import { getCharities } from './store/actions/charities';
import { setTagsAPI } from './store/actions/tags';
import { BrowserRouter } from 'react-router-dom';
import Socket from './socket'

function App(props) {
  const dispatch = useDispatch();
  dispatch(getSocialMedia());
  dispatch(getCategories());
  dispatch(getLanguages());
  dispatch(getCharities());
  dispatch(setTagsAPI());
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('language');
  i18n.language = currentLanguage || 'en';
  useEffect(() => {
    document.body.style.fontFamily =
      i18n.language === 'en' ? 'Montserrat' : 'Cairo';
    return () => {};
  }, [i18n.language]);
  return (
    <ConfigProvider direction={i18n.language === 'en' ? 'ltr' : 'rtl'}>
      <BrowserRouter>
        <Row
          style={{
            fontFamily: i18n.language === 'en' ? 'Montserrat' : 'Cairo',
            display: 'block',
          }}
        >
          <Router />
          {/* <Socket /> */}
        </Row>
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
