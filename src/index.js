import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import { initReactI18next } from "react-i18next";
import App from './App';
import * as serviceWorker from './serviceWorker';
import i18n from "i18next";
import { Provider } from 'react-redux';
import aws_exports from './aws-exports';
import store from './store/store';
import "antd/dist/antd.css"
import './index.css';

Amplify.configure(aws_exports)

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: require('./lang.json'),
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
