import { combineReducers } from 'redux';
import social from './social';
import categories from './categories';
import languages from './languages';
import charities from './charities';
import tags from './tags';
import user from './user';
import loading from './loading';
import notifications from './notifications';

const rootReducer = combineReducers({
  social,
  categories,
  languages,
  charities,
  user,
  loading,
  tags,
  notifications,
});

export default rootReducer;
